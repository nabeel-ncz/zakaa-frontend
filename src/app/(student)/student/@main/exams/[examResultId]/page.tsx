"use client";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { getExamResultsByIdAction } from "@/store/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function page({ params }: any) {

    const { examResultId } = params;

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [examResult, setExamResult] = useState<any>(null);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {

            const result = await dispatch(getExamResultsByIdAction({
                id: examResultId
            }));

            setExamResult(result?.payload?.data);

        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="w-full min-h-screen p-4 flex">
                        <div className="w-1/2">
                            <h2 className="font-bold text-2xl underline">{examResult.assessmentRef?.title}</h2>
                            <div className="flex flex-col items-start gap-4">
                                {examResult.assessmentRef?.questions?.map((question: any, index: number) => (
                                    <div className="mt-2 flex flex-col gap-2">
                                        <h2 className="font-medium text-lg">{index + 1}. {question.question} ?</h2>
                                        {Object.entries(question?.options).map(([key, value]: any) => (
                                            <div className={`${question.answer == key ? "bg-green-200" : ""} px-4 py-2 w-full flex items-center justify-start gap-2 rounded-md border border-gray-300`}>
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                                                    {key}
                                                </span>
                                                {value}
                                            </div>
                                        ))}
                                        <h2>Your answer : Option {examResult.response[index]} </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="w-full flex flex-col items-start rounded bg-white p-4 shadow">
                                <h2 className="font-bold text-lg text-wrap line-clamp-1">
                                    {examResult.score < examResult.assessmentRef.passingScore ?
                                        (<span className="text-red-800">
                                            Failed
                                        </span>) :
                                        (<span className="text-green-800">
                                            Passed
                                        </span>)}
                                </h2>
                                <p className="text-base font-medium">Total questions : {examResult.assessmentRef.questions.length}</p>
                                <p className="text-base font-medium">Total mark : {examResult.assessmentRef.totalScore}</p>
                                <p className="text-base font-medium">Pass mark : {examResult.assessmentRef.passingScore}</p>
                                <p className="text-base font-medium">Your mark : {examResult.score}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
