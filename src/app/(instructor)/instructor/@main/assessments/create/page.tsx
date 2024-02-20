"use client";
import { CreateExamSchema } from "@/lib/validation/schema/createExam";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { getCourseAction } from "@/store/actions/course";
import { getInstructorCoursesAction } from "@/store/actions/course/getInstructorCoursesAction";
import { CreateExamFormData } from "@/types";
import { getObject, storeObject } from "@/utils/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";

export default function AssessmentCreation() {

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();
    const [userCourses, setUseCourses] = useState<any>(null);
    const [choosedCourse, setChoosedCourse] = useState<any>(null);
    const [instructorId, setInstructorId] = useState("");

    useEffect(() => {
        if(getObject("exam")){
            router.replace("/instructor/assessments");
            toast.error("Complete you pending exam!", { position: 'top-right' });
        }
    }, []);

    useEffect(() => {
        dispatch(fetchUserAction()).then((res1) => {
            if (res1.payload.success) {
                setInstructorId(res1.payload?.data?._id);
                dispatch(getInstructorCoursesAction({
                    instructorId: res1.payload?.data?._id
                })).then((res2) => {
                    if (res2.payload.success) {
                        setUseCourses(res2.payload.data);
                    }
                })
            }
        });
    }, []);

    const handleCourseChange = (courseId: string) => {
        if (!courseId) {
            setChoosedCourse(null);
            return;
        }
        dispatch(getCourseAction({ courseId }))
            .then((res) => {
                if (res.payload.success) {
                    setChoosedCourse(res.payload.data);
                }
            })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof CreateExamSchema>>({
        resolver: zodResolver(CreateExamSchema),
    });

    const onSubmit = (data: CreateExamFormData) => {
        storeObject("exam", {
            title: data.title,
            questionScore: data.scoreForEachQuestion,
            totalNoOfQuestions: Number(data.totalNoOfQuestions),
            totalScore: Number(data.totalNoOfQuestions) * Number(data.scoreForEachQuestion),
            passingScore: data.passMark,
            courseId: choosedCourse?._id,
            lessonId: data.lessonId,
            instructorId: instructorId,
            questions: []
        });

        router.push("create/1");
    }

    return (
        <>
            <div className="relative w-full px-10 flex items-end justify-end">
                <div>
                    {/* <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button> */}
                    <button onClick={handleSubmit(onSubmit)} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Next</button>
                </div>
            </div>
            <div className="w-full px-80 py-4 flex items-center">
                <div className="w-full flex flex-col">

                    <div className="-mt-12">
                        <h2 className="font-bold text-2xl">Craft Your <span className="primary-text">Assessment </span> ?</h2>
                        <h2 className="font-light text-lg">Personalize Your Assessment Structure!</h2>
                    </div>

                    <div className="mt-8">

                        <h2 className="font-medium text-xs mb-1 ">Title of your exam : <span className="text-red-700">*</span></h2>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder="Title of your exam"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"title"}`] && <span className="custom-form-error"> {errors[`${"title"}`]?.message}</span>}


                        <h2 className="mt-4 font-medium text-xs mb-1 ">Select your course <span className="text-red-700">*</span></h2>

                        <select
                            onChange={(evt) => { handleCourseChange(evt.target.value) }}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        >
                            <option value={""}>select your course</option>
                            {userCourses?.map((item: any) => (
                                <option value={item._id} >{item.title}</option>
                            ))}
                        </select>

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Select lesson <span className="text-red-700">*</span></h2>

                        <select
                            {...register("lessonId")}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        >
                            <option value={""}>select your lesson</option>
                            {choosedCourse?.lessons?.map((item: any) => (
                                <option value={item._id} >{item.title}</option>
                            ))}
                        </select>
                        {errors && errors[`${"lessonId"}`] && <span className="custom-form-error"> {errors[`${"lessonId"}`]?.message}</span>}


                        <h2 className="mt-4 font-medium text-xs mb-1 ">Total number of questions <span className="text-red-700">*</span></h2>
                        <input
                            {...register("totalNoOfQuestions")}
                            type="number"
                            placeholder="Total questions"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"totalNoOfQuestions"}`] && <span className="custom-form-error"> {errors[`${"totalNoOfQuestions"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Score for each question <span className="text-red-700">*</span></h2>
                        <input
                            {...register("scoreForEachQuestion")}
                            type="number"
                            placeholder="Score for each question"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"scoreForEachQuestion"}`] && <span className="custom-form-error"> {errors[`${"scoreForEachQuestion"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Pass mark <span className="text-red-700">*</span></h2>
                        <input
                            {...register("passMark")}
                            type="number"
                            placeholder="Pass mark"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"passMark"}`] && <span className="custom-form-error"> {errors[`${"passMark"}`]?.message}</span>}
                    </div>
                </div>
            </div>
        </>

    )
}
