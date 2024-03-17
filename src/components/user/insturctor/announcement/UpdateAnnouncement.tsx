"use client";
import ImageUpload from "@/components/ui/ImageUpload"
import { TypeDispatch } from "@/store";
import { getAnnouncementByIdAction, updateAnnouncementAction } from "@/store/actions/announcements";
import { AnnouncementEntity } from "@/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ZodType, z } from "zod";

export default function UpdateAnnouncement({ params: { id } }: { params: { id: string } }) {

    const router = useRouter();
    const [data, setData] = useState<AnnouncementEntity | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>("");
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        dispatch(getAnnouncementByIdAction(id))
            .then((res) => {
                if (res.payload?.success) {
                    setValue("title", res.payload?.data?.title);
                    setValue("description", res.payload?.data?.description);
                    setValue("status", String(res.payload?.data?.isBlocked));
                    setData(res.payload?.data);
                }
            })
    }

    interface ISchema {
        title: string;
        description: string;
        status: string | boolean;
    };

    const Schema: ZodType<ISchema> = z.object({
        title: z.string().min(1, "Title is required!"),
        description: z.string().min(1, "Description is required!"),
        status: z.string().min(1, "Status is required!")
    });

    const onSubmit = async (form: ISchema) => {
        if (!file && isImageChanged) {
            setFileError("Image is required!");
            return;
        }
        try {
            setLoading(true);
            let updates: any = {};
            if (isImageChanged) {
                const formData = new FormData();
                formData.append("file", file || "");
                formData.append("upload_preset", "ml_default");
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const data = await response.json();
                updates['content'] = data?.secure_url;
            } else {
                updates['content'] = data?.content;
            }

            updates['_id'] = data?._id;
            updates['title'] = form.title;
            updates['description'] = form.description;
            updates['isBlocked'] = form.status as boolean;

            const res = await dispatch(updateAnnouncementAction(updates));

            if (!res.payload?.success) {
                throw new Error(res.payload?.message || "Something wrong!");
            }

            router.replace("/instructor/announcements");

        } catch (error: any) {
            toast.error(error?.message || "something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            title: "",
            description: "",
            status: "false"
        }
    });

    return (
        <>
            <div className="w-full min-h-screen pt-4">
                <div className="w-full px-80 py-4 flex flex-col items-start">
                    {isImageChanged ? (
                        <>
                            <ImageUpload onChange={(file: File | null) => {
                                if (file) setFileError("");
                                setFile(file);
                            }} />
                            {fileError && <span className="custom-form-error">{fileError}</span>}
                        </>
                    ) : (
                        <>
                            <div className="w-full relative h-56 flex items-center justify-center secondary-bg border border-gray-400 border-dashed rounded-md">
                                <img
                                    crossOrigin="anonymous"
                                    src={`${data?.content}`}
                                    alt={"Loading"}
                                    className="h-full"
                                />
                                <button onClick={() => { setIsImageChanged(true) }} className="absolute px-3 py-1 bg-red-500 text-white">clear</button>
                            </div>
                        </>
                    )}

                    <h2 className="font-medium text-xs mt-2 mb-1">Title : </h2>
                    <input
                        {...register("title")}
                        type="text"
                        placeholder="Title of your exam"
                        className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                    />
                    {errors && errors[`${"title"}`] && <span className="custom-form-error"> {errors[`${"title"}`]?.message}</span>}

                    <h2 className="font-medium text-xs mt-2 mb-1">Description : </h2>
                    <textarea
                        {...register("description")}
                        placeholder="Title of your exam"
                        className="w-full h-32 rounded-lg font-medium border px-4 pt-2 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                    />
                    {errors && errors[`${"description"}`] && <span className="custom-form-error"> {errors[`${"description"}`]?.message}</span>}
                    
                    <h2 className="font-medium text-xs mt-2 mb-1">Status : </h2>
                    <select
                        {...register("status")}
                        className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                    >
                        <option value="false">Published</option>
                        <option value="true">UnPublished</option>
                    </select>
                    {errors && errors[`${"status"}`] && <span className="custom-form-error"> {errors[`${"status"}`]?.message}</span>}

                    <div className="w-full flex items-center justify-end gap-2 mt-2">
                        <button
                            onClick={() => {
                                router.push("/instructor/announcements");
                            }}
                            className="px-4 py-1 text-sm font-medium rounded bg-white border text-purple-800 border-purple-800">Cancel</button>
                        {loading ? (
                            <button
                                className="px-4 py-1 text-sm font-medium rounded bg-purple-800 text-white">Submitting....</button>
                        ) : (
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="px-4 py-1 text-sm font-medium rounded bg-purple-800 text-white">Submit</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
