"use client";
import BanterLoader from '@/components/ui/BanterLoader';
import { TypeDispatch } from '@/store';
import { getAssessmentByIdAction, updateExamAction } from '@/store/actions/course';
import { PUBLIC_RESOURCE_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function page({ params }: any) {

    const { assessmentId } = params;

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [exam, setExam] = useState<any>(null);
    const [formState, setFormState] = useState<any>({
        title: "",
        scoreForEachQuestion: "",
        passingScore: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getAssessmentByIdAction({
            id: assessmentId
        })).then((res) => {
            if (res.payload?.success) {
                setExam(res.payload?.data);
                const data = res.payload?.data;
                const state = {
                    title: data?.title,
                    scoreForEachQuestion: Number(data?.totalScore) / Number(data?.questions?.length),
                    passingScore: data?.passingScore
                };
                setFormState(state);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleChange = (evt: any) => {
        setFormState((state: any) => ({
            ...state,
            [evt.target.name]: evt.target.value
        }))
    }

    const handleSubmition = async () => {
        
        if(!formState.title || !formState.scoreForEachQuestion || !formState.passingScore){
            return;
        }

        try {
            setLoading(true);

            const result: any = await dispatch(updateExamAction({
                _id: exam._id,
                title: formState.title,
                questionScore: Number(formState.scoreForEachQuestion),
                totalScore: Number(formState.scoreForEachQuestion) * exam.questions?.length,
                passingScore: Number(formState.passingScore)
            }));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            setError(null);
            setLoading(false);

            router.replace("/instructor/assessments");

        } catch (error: any) {
            setError(error?.message || "Something went wrong, try again!");;
            setLoading(false);
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

            <div className="w-full px-80 py-4 flex items-center">
                {exam && (
                    <div className="w-full flex flex-col">
                        <h2 className="font-bold text-2xl">Update Your <span className="primary-text">Assessment </span> ?</h2>

                        <div className="mt-8">

                            <h2 className="font-medium text-xs mb-1 ">Title of your exam : <span className="text-red-700">*</span></h2>
                            <input
                                value={formState.title}
                                onChange={handleChange}
                                name='title'
                                type="text"
                                placeholder="Title of your exam"
                                className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                            />
                            {!formState.title && <span className="custom-form-error">Title is required</span>}

                            <div className="flex flex-col gap gap-2 mt-4">
                                <h2 className="font-medium text-base">Total number of questions : {exam.questions?.length}</h2>
                                <h2 className="font-medium text-base">Exam attached to : </h2>
                                <div className="flex items-center justify-start gap-2 bg-white p-2 shadow w-fit">
                                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${exam.courseId?.thumbnail}`} alt="" className="w-32" />
                                    <div className="flex flex-col items-start opacity-50">
                                        <h2 className="font-medium text-base">- {exam.courseId.title}</h2>
                                        <h2 className="font-medium text-base">- {exam.courseId.lessons.find((item: any) => item._id === exam.lessonId)?.title || "nil"}</h2>
                                    </div>
                                </div>
                            </div>

                            <h2 className="mt-4 font-medium text-xs mb-1 ">Score for each question <span className="text-red-700">*</span></h2>
                            <input
                                value={formState.scoreForEachQuestion}
                                onChange={handleChange}
                                name='scoreForEachQuestion'
                                type="number"
                                placeholder="Title of your exam"
                                className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                            />
                            {(!formState.scoreForEachQuestion || Number(formState.scoreForEachQuestion) <= 0) && <span className="custom-form-error">Score for each question should be valid!</span>}

                            <h2 className="mt-4 font-medium text-xs mb-1 ">Pass mark <span className="text-red-700">*</span></h2>
                            <input
                                value={formState.passingScore}
                                onChange={handleChange}
                                name='passingScore'
                                type="number"
                                placeholder="Title of your exam"
                                className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                            />
                            {(!formState.passingScore || Number(formState.passingScore) <= 0) && <span className="custom-form-error">Pass mark should be valid!</span>}

                        </div>
                        <div className="w-full flex items-center justify-end mt-4">
                            <button onClick={handleSubmition} className="bg-purple-800 px-4 py-2 rounded text-sm font-medium text-white">Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
