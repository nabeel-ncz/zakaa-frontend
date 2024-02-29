"use client";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { fetchUserAction, getExamResultsByUserIdAction } from "@/store/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Exams() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [exams, setExams] = useState<any[] | null>(null);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {

            const user = await dispatch(fetchUserAction());
            const result = await dispatch(getExamResultsByUserIdAction({
                userId: user?.payload?.data?._id
            }));

            setExams(result?.payload?.data);

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
                    {!exams || exams.length === 0 ? (
                        <div className="w-full pe-6 pt-12 flex flex-col gap-2 items-center justify-center">
                            <img src="/icons/not-found.png" alt="" className="h-80" />
                            <h2 className="font-bold text-xl">No exams found!</h2>
                        </div>
                    ) : (
                        <>
                            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                                {exams?.map((item) => (
                                    <div className="w-[17rem] relative bg-white h-[12rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-start justify-start w-11/12">
                                            <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">{item.assessmentRef.title}</h2>
                                            <h2 className="font-medium text-md text-wrap line-clamp-1">
                                                {item.score < item.assessmentRef.passingScore ?
                                                    (<span className="text-red-800">
                                                        Failed
                                                    </span>) :
                                                    (<span className="text-green-800">
                                                        Passed
                                                    </span>)}
                                            </h2>
                                            <p className="text-xs font-light">Total questions : {item.assessmentRef.questions.length}</p>
                                            <p className="text-xs font-light">Total mark : {item.assessmentRef.totalScore}</p>
                                            <p className="text-xs font-light">Pass mark : {item.assessmentRef.passingScore}</p>
                                            <p className="text-xs font-light">Your mark : {item.score}</p>
                                            <div className="flex w-full items-center justify-end mt-4 gap-2">
                                                <button onClick={() => {
                                                    router.push(`exams/${item._id}`);
                                                }} className="px-4 py-1 rounded bg-black font-medium text-white text-xs" >View</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </>
                    )}

                </>
            )}
        </>
    )
}