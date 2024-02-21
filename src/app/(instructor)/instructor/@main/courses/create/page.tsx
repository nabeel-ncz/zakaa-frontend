"use client"
import BanterLoader from "@/components/ui/BanterLoader";
import CourseFormField from "@/components/ui/CourseFormField";
import FormTypeSelector from "@/components/ui/FormTypeSelector";
import ImageUpload from "@/components/ui/ImageUpload";
import VideoUpload from "@/components/ui/VideoUpload";
import { CreateCourseSchema } from "@/lib/validation/schema/createCourse";
import { TypeDispatch } from "@/store";
import { uploadCourseContent } from "@/store/actions/course";
import { CreateCourseFormData } from "@/types";
import { getObject, storeObject } from "@/utils/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";

export default function CreateCourse() {

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [courseThumbnail, setCourseThumbnail] = useState(null);
    const [trialVideo, setTrialVideo] = useState(null);
    const [trialTitle, setTrialTitle] = useState("");
    const [trialDescription, setTrialDescription] = useState("");
    const [pricingType, setPricingType] = useState("free");
    const [pricingAmount, setPricingAmount] = useState("0");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (getObject("course")) {
            router.replace("/instructor/courses");
            toast.error("Complete you pending course!", { position: 'top-right' });
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof CreateCourseSchema>>({
        resolver: zodResolver(CreateCourseSchema),
    });

    const onSubmit = async (data: CreateCourseFormData) => {
        try {
            setSubmitted(true);
            if (!courseThumbnail || !pricingType || (pricingType === "paid" && !trialVideo) || (trialVideo && (!trialTitle || !trialDescription))) {
                return;
            }

            if (pricingType === "paid" && Number(pricingAmount) <= 0) {
                return;
            }

            setLoading(true);

            const result: any = await dispatch(uploadCourseContent({
                courseThumbnail,
                trialVideo
            }));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            setError(null);

            const courseData = {
                title: data.courseTitle,
                description: data.courseDescription,
                categoryRef: data.courseCategory,
                thumbnail: result.payload.data?.thumbnail,
                numberOfLessons: data.numberOfLessons,
                pricing: {
                    type: pricingType,
                    amount: pricingAmount
                },
                trial: {
                    video: result.payload.data?.trialVideo,
                    title: trialTitle,
                    description: trialDescription
                },
                lessons: []
            }

            storeObject("course", courseData);

            setLoading(false);

            router.push("create/1");

        } catch (error: any) {
            setLoading(false);
            setError(error.message || "Something went wrong, Try again!");
        }
    }

    return (
        <>
            {error && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    <div className="px-12 py-12 bg-white flex flex-col items-center justify-center rounded-md gap-2">
                        <h2 className="font-medium text-red-900 text-lg">{error}</h2>
                        <button className="px-6 py-2 rounded font-medium text-white bg-black" onClick={() => { setError(null) }} >Try again!</button>
                    </div>
                </div>
            )}
            {loading && (
                <div className="fixed z-50 top-0 left-0 flex flex-col items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    <BanterLoader />
                    <h2 className="absolute top-[60%] font-medium">Resources are processing, Please wait!</h2>
                </div>
            )}
            <div className="w-full px-10 flex items-end justify-end">
                <div>
                    {/* <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button> */}
                    <button onClick={handleSubmit(onSubmit)} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Next</button>
                </div>
            </div>

            <div className="w-full px-10 py-4 flex gap-12">
                <div className="w-7/12">
                    <h2 className="font-medium text-xs mb-1 ">Course thumbnail <span className="text-red-700">*</span></h2>

                    <ImageUpload onChange={(file: any) => { setCourseThumbnail(file) }} />
                    {(submitted && !courseThumbnail) && <span className="custom-form-error">Thumbnail is required!</span>}

                    <CourseFormField
                        style={['mt-4']}
                        title="Course title"
                        fieldName="courseTitle"
                        fieldType="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <CourseFormField
                        style={['mt-4']}
                        title="Course category"
                        fieldName="courseCategory"
                        fieldType="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <CourseFormField
                        style={['mt-4']}
                        title="Course description"
                        fieldName="courseDescription"
                        fieldType="textarea"
                        required
                        register={register}
                        errors={errors}
                    />

                    <CourseFormField
                        style={['mt-4']}
                        title="Number of lessons"
                        fieldName="numberOfLessons"
                        fieldType="number"
                        required
                        register={register}
                        errors={errors}
                    />

                </div>
                <div className="w-5/12">

                    <FormTypeSelector
                        title="Pricing"
                        types={["free", "paid"]}
                        onChange={(item: string) => { setPricingType(item) }}
                        required
                    />
                    {(submitted && !pricingType) && <span className="custom-form-error">Pricing is required!</span>}

                    {pricingType === "paid" && (
                        <>
                            <h2 className="mt-4 font-medium text-xs mb-1 ">Amount <span className="text-red-700"></span></h2>
                            <input
                                value={pricingAmount}
                                onChange={(e) => { setPricingAmount(e.target.value) }}
                                type="number"
                                className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                            />
                            {(Number(pricingAmount) <= 0) && <span className="custom-form-error">Amount should be valid!</span>}
                        </>
                    )}

                    <h2 className="mt-4 font-medium text-xs mb-1 ">Trial video <span className="text-red-700"></span></h2>
                    <VideoUpload onChange={(file: any) => { setTrialVideo(file) }} />
                    {(submitted && pricingType === "paid" && !trialVideo) && <span className="custom-form-error">Trial video is required!</span>}


                    <h2 className="mt-4 font-medium text-xs mb-1">Video title</h2>
                    <input
                        value={trialTitle}
                        onChange={(e) => { setTrialTitle(e.target.value) }}
                        type="text"
                        className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                    />
                    {(trialVideo && !trialTitle) && <span className="custom-form-error">Title is required!</span>}


                    <h2 className="mt-4 font-medium text-xs mb-1">Video description</h2>
                    <input
                        value={trialDescription}
                        onChange={(e) => { setTrialDescription(e.target.value) }}
                        type="text"
                        className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                    />
                    {(trialVideo && !trialDescription) && <span className="custom-form-error">Description is required!</span>}

                </div>
            </div>
        </>
    )
}