"use client";
import { CreateQuestionSchema } from "@/lib/validation/schema/createQuestion";
import { CreateQuestionFormData } from "@/types";
import { getObject, storeObject } from "@/utils/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function AssessmentQuestion({ params }: any) {

    const { question } = params;
    const router = useRouter();
    const [actionText, setActionText] = useState("Next");


    useEffect(() => {
        const exam = getObject("exam");
        
        if (!exam) {
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.replace("/instructor/assessments");
            return;
        }
        if (Number(question) > exam.questions.length + 1 || Number(question) <= exam.questions.length) {
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.replace("/instructor/assessments");
            return;
        }

        if (exam.totalNoOfQuestions == question) {
            setActionText("Complete");
        } else {
            setActionText("Next");
        }

    }, []);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof CreateQuestionSchema>>({
        resolver: zodResolver(CreateQuestionSchema),
    });

    const onSubmit = (data: CreateQuestionFormData) => {
        const currentState = getObject("exam");
        storeObject("exam", {
            ...currentState,
            questions: [
                ...currentState.questions,
                {
                    question: data.question,
                    answer: data.answer,
                    options: {
                        1: data.option_1,
                        2: data.option_2,
                        3: data.option_3,
                        4: data.option_4
                    }
                }
            ]
        });
        if(currentState.questions.length + 1 === currentState.totalNoOfQuestions){
            router.push("finish");
            return;
        }
        router.push(`${Number(question)+1}`);
    }

    return (
        <>
            <div className="relative w-full px-10 flex items-end justify-end">
                <div>
                    {/* <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button> */}
                    <button onClick={handleSubmit(onSubmit)} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">{actionText}</button>
                </div>
            </div>
            <div className="w-full px-80 py-4 flex items-center">
                <div className="w-full flex flex-col">

                    <div className="-mt-12">
                        <h2 className="font-bold text-2xl">Question <span className="primary-text">No : {question} </span> ?</h2>
                        {/* <h2 className="font-light text-lg">Optimize Question Quality for Effective Evaluation!</h2> */}
                    </div>

                    <div className="mt-4">
                        <h2 className="mt-4 font-medium text-xs mb-1 ">Question <span className="text-red-700">*</span></h2>
                        <input
                            {...register("question")}
                            type="text"
                            placeholder="Write your question"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"question"}`] && <span className="custom-form-error"> {errors[`${"question"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 1 <span className="text-red-700">*</span></h2>
                        <input
                            {...register("option_1")}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"option_1"}`] && <span className="custom-form-error"> {errors[`${"option_1"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 2 <span className="text-red-700">*</span></h2>
                        <input
                            {...register("option_2")}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"option_2"}`] && <span className="custom-form-error"> {errors[`${"option_2"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 3 <span className="text-red-700">*</span></h2>
                        <input
                            {...register("option_3")}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"option_3"}`] && <span className="custom-form-error"> {errors[`${"option_3"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 4 <span className="text-red-700">*</span></h2>
                        <input
                            {...register("option_4")}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {errors && errors[`${"option_4"}`] && <span className="custom-form-error"> {errors[`${"option_4"}`]?.message}</span>}

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Answer <span className="text-red-700">*</span></h2>
                        <select
                            {...register("answer")}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        >
                            <option value={""}>Select the correct answer</option>
                            <option value={"1"}>Option 1</option>
                            <option value={"2"}>Option 2</option>
                            <option value={"3"}>Option 3</option>
                            <option value={"4"}>Option 4</option>
                        </select>
                        {errors && errors[`${"answer"}`] && <span className="custom-form-error"> {errors[`${"answer"}`]?.message}</span>}

                    </div>
                </div>
            </div>
        </>

    )
}
