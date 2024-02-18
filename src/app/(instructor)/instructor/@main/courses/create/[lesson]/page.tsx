"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import CourseFormField from "@/components/ui/CourseFormField";
import FileUpload from "@/components/ui/FileUpload";
import ImageUpload from "@/components/ui/ImageUpload";
import VideoUpload from "@/components/ui/VideoUpload";
import { CreateLessonSchema } from "@/lib/validation/schema/createLesson";
import { TypeDispatch } from "@/store";
import { uploadLessonContent } from "@/store/actions/course/uploadLessonContent";
import { CreateLessonFormData } from "@/types";
import { getObject, storeObject } from "@/utils/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";


export default function CreateLesson({ params }: any) {

    const { lesson } = params;
    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);
    const [lessonVideo, setLessonVideo] = useState(null);
    const [lessonThumbnail, setLessonThumbnail] = useState(null);
    const [lessonAttachment, setLessonAttachment] = useState(null);
    const [attachmentTitle, setAttachmentTitle] = useState("");
    const [actionText, setActionText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const course = getObject("course");
        if(!course){
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.back();
            return;  
        }
        if (course.lessons.length + 1 < lesson) {
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.back();
            return;
        }
        if (lesson <= course.lessons.length) {
            toast.error("You are already completed this, go to next!", { position: 'top-right' });
            router.back();
            return;
        }
    }, []);

    useEffect(() => {
        const course = getObject("course");
        if(!course){
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.back();
            return;
        }
        if(lesson > Number(course.numberOfLessons) ){
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.back();
            return;
        }

        if (course.numberOfLessons === lesson) {
            setActionText("Complete");
        } else {
            setActionText("Next");
        }

    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof CreateLessonSchema>>({
        resolver: zodResolver(CreateLessonSchema),
    });

    const onSubmit = async (data: CreateLessonFormData) => {
        try {
            setSubmitted(true);
            if (!lessonVideo || !lessonThumbnail) {
                return;
            }
            if (lessonAttachment && !attachmentTitle) {
                return;
            }

            setLoading(true);

            const result: any = await dispatch(uploadLessonContent({
                lessonThumbnail,
                lessonVideo,
                lessonAttachment
            }));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            const course = getObject("course");
            const lessons = course.lessons;
            const courseData = {
                ...course,
                lessons: [...lessons, {
                    thumbnail: result.payload.data?.thumbnail,
                    video: result.payload.data?.lessonVideo,
                    attachment: result.payload.data?.attachment,
                    title: data.lessonTitle,
                    description: data.lessonDescription
                }]
            };

            storeObject("course", courseData);

            setLoading(false);

            if(actionText==="Complete"){
                router.push("finish");
                return;
            }

            router.push(`${Number(lesson) + 1}`);

        } catch (error: any) {
            setLoading(false);
            setError(error?.message || "Something went wrong, try again!");
        }
    }

    return (
        <>
            {error && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050]">
                    <div className="px-12 py-12 bg-white flex flex-col items-center justify-center rounded-md gap-2">
                        <h2 className="font-medium text-red-900 text-lg">{error}</h2>
                        <button className="px-6 py-2 rounded font-medium text-white bg-black" onClick={() => { setError(null) }} >Try again!</button>
                    </div>
                </div>
            )}
            {loading && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050]">
                    <BanterLoader />
                </div>
            )}
            <div className="w-full px-10 flex items-end justify-between">
                <div>
                    <h2 className="font-bold">Lesson {lesson}</h2>
                </div>
                <div>
                    <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button>
                    <button onClick={handleSubmit(onSubmit)} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">{actionText || "Next"}</button>
                </div>
            </div>
            <div className="w-full px-10 py-4 flex gap-12">
                <div className="w-6/12">


                    <h2 className="font-medium text-xs mb-1 ">Lesson Resource <span className="text-red-700">*</span></h2>
                    <VideoUpload onChange={(file: any) => { setLessonVideo(file) }} />
                    {(submitted && !lessonVideo) && <span className="custom-form-error">Video is required!</span>}

                    <CourseFormField
                        style={['mt-4']}
                        title="Lesson title"
                        fieldName="lessonTitle"
                        fieldType="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <CourseFormField
                        style={['mt-4']}
                        title="Lesson description"
                        fieldName="lessonDescription"
                        fieldType="textarea"
                        required
                        register={register}
                        errors={errors}
                    />

                </div>
                <div className="w-6/12">

                    <h2 className="font-medium text-xs mb-1 ">Lesson thumbnail <span className="text-red-700">*</span></h2>
                    <ImageUpload onChange={(file: any) => { setLessonThumbnail(file) }} />
                    {(submitted && !lessonThumbnail) && <span className="custom-form-error">Thumbnail is required!</span>}

                    <h2 className="mt-4 font-medium text-xs mb-1 ">Lesson Attachments</h2>
                    <FileUpload onChange={(file: any) => { setLessonAttachment(file) }} />


                    <h2 className="mt-4 font-medium text-xs mb-1 ">Attachment title</h2>
                    <input
                        value={attachmentTitle}
                        onChange={(e) => { setAttachmentTitle(e.target.value) }}
                        type="text"
                        className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                    />
                    {(lessonAttachment && !attachmentTitle) && <span className="custom-form-error">Attachment title is required!</span>}
                </div>
            </div>
        </>
    )
}
