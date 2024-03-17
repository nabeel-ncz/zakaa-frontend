"use client";
import ImageUpload from "@/components/ui/ImageUpload"
import { TypeDispatch, TypeState } from "@/store";
import { createAnnouncementAction } from "@/store/actions/announcements";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ZodType, z } from "zod";

export default function CreateAnnouncement() {

    const router: AppRouterInstance = useRouter();
    const [file, setFile] = useState<any>(null);
    const [fileError, setFileError] = useState<string>("");
    const dispatch: TypeDispatch = useDispatch();
    const _id = useSelector((state: any) => state.user?.data?._id);
    const [loading, setLoading] = useState<boolean>(false);

    interface ISchema {
        title: string;
        description: string;
    };

    const Schema: ZodType<ISchema> = z.object({
        title: z.string().min(1, "Title is required!"),
        description: z.string().min(1, "Description is required!")
    });

    const onSubmit = async (form: ISchema) => {
        if (!file) {
            setFileError("Image is required!");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default");
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();

            const res = await dispatch(createAnnouncementAction({
                title: form.title,
                description: form.description,
                content: data.secure_url,
                userRef: _id
            }));

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
        formState: { errors }
    } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema)
    });

    return (
        <>
            <div className="w-full min-h-screen pt-4">
                <div className="w-full px-80 py-4 flex flex-col items-start">
                    <ImageUpload onChange={(file) => {
                        if (file) setFileError("");
                        setFile(file);
                    }} />
                    {fileError && <span className="custom-form-error">{fileError}</span>}

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
