"use client";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { getAssessmentsByInstructorIdAction } from "@/store/actions/course/getAssessmentsByInstructorIdAction";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Assessments() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [pendingExam, setPendingExam] = useState<any>(null);
    const [createdExams, setCreatedExams] = useState<any>(null);

    useEffect(() => {
        const exam = getObject("exam")
        if (exam) {
            setPendingExam(exam);
        }
    }, []);

    useEffect(() => {
        dispatch(fetchUserAction()).then((res1) => {
            if (res1.payload.success) {
                dispatch(getAssessmentsByInstructorIdAction({
                    instructorId: res1.payload.data._id
                })).then((res2) => {
                    if(res2.payload.success){
                        setCreatedExams(res2.payload.data);
                    }
                })
            }
        })
    }, []);

    const handleDelete = () => {
        deleteObject("exam");
        setPendingExam(null);
    }

    const navigateToCreate = () => {
        if (getObject("exam")) {
            toast.error("Complete you pending exam creation!", { position: 'top-right' });
            return;
        }
        router.push("assessments/create");
    }

    const handlePendingConinuation = () => {
        if (pendingExam.totalNoOfQuestions === pendingExam.questions.length) {
            router.push(`assessments/create/finish`);
            return;
        }
        if (pendingExam.totalNoOfQuestions > pendingExam.questions.length) {
            router.push(`assessments/create/${pendingExam.questions.length + 1}`)
            return;
        }
    }

    return (
        <div className="w-full min-h-screen">
            <div className="px-4 flex items-end justify-end w-full">
                <button onClick={navigateToCreate} className="px-4 py-2 rounded border-[rgba(127,39,194,0.5)] border-2 bg-white font-medium">Create</button>
            </div>
            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                {pendingExam && (
                    <div className="w-[17rem] relative bg-white h-[10rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute flex items-center justify-center w-11/12 h-24 bg-[rgba(255,255,255,0.5)] top-3 backdrop-blur-sm">
                            <h1 className="font-medium text-black">Pending Assessment</h1>
                        </div>
                        <div className="flex flex-col items-start justify-start w-11/12">
                            <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">Web development exam</h2>
                            <p className="text-xs font-light">Total questions : 10</p>
                            <p className="text-xs font-light">Total mark : 10</p>
                            <p className="text-xs font-light">Pass mark : 10</p>
                            <div className="flex w-full items-center justify-end mt-4 gap-2">
                                <button onClick={handleDelete} className="px-4 py-1 rounded border border-black font-medium text-black text-xs">Delete</button>
                                <button onClick={handlePendingConinuation} className="px-4 py-1 rounded bg-black font-medium text-white text-xs" >Continue</button>
                            </div>
                        </div>
                    </div>
                )}

                {createdExams?.map((item: any) => (
                    <div className="w-[17rem] relative bg-white h-[10rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                        <div className="flex flex-col items-start justify-start w-11/12">
                            <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">{item.title}</h2>
                            <p className="text-xs font-light">Total questions : {item.questions.length}</p>
                            <p className="text-xs font-light">Total mark : {item.totalScore}</p>
                            <p className="text-xs font-light">Pass mark : {item.passingScore}</p>
                            <div className="flex w-full items-center justify-end mt-4 gap-2">
                                <button className="px-4 py-1 rounded border border-black font-medium text-black text-xs">Delete</button>
                                <button onClick={() => {
                                    router.push(`assessments/${item._id}`);
                                }} className="px-4 py-1 rounded bg-black font-medium text-white text-xs" >View</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}