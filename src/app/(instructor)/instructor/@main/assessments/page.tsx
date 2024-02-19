"use client";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Assessments() {

    const router = useRouter();
    const [pendingExam, setPendingExam] = useState(null);

    useEffect(() => {
        const exam = getObject("exam")
        if (exam) {
            setPendingExam(exam);
        }
    }, []);

    const handleDelete = () => {
        deleteObject("exam");
    }

    const navigateToCreate = () => {
        if (getObject("exam")) {
            toast.error("Complete you pending exam creation!", { position: 'top-right' });
            return;
        }
        router.push("assessments/create");
    }

    return (
        <div className="w-full min-h-screen">
            <div className="px-4 flex items-end justify-end w-full">
                <button onClick={navigateToCreate} className="px-4 py-2 rounded border-[rgba(127,39,194,0.5)] border-2 bg-white font-medium">Create</button>
            </div>
            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                {pendingExam && (
                    <div className="w-[17rem] relative bg-white h-[12rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute flex items-center justify-center w-11/12 h-32 bg-[rgba(255,255,255,0.5)] top-3 backdrop-blur-sm">
                            <h1 className="font-medium text-black">Pending Assessment</h1>
                        </div>
                        <div className="flex flex-col items-start justify-start w-11/12">
                            <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">Web development exam</h2>
                            <p className="text-xs font-light">Total questions : 10</p>
                            <p className="text-xs font-light">Total mark : 10</p>
                            <p className="text-xs font-light">Pass mark : 10</p>
                            <p className="text-xs font-light line-clamp-1">Course : Web development course</p>
                            <p className="text-xs font-light line-clamp-1">Lesson (2) : Fundamentals of html & css</p>
                            <div className="flex w-full items-center justify-end mt-4 gap-2">
                                <button className="px-4 py-1 rounded border border-black font-medium text-black text-xs">Delete</button>
                                <button className="px-4 py-1 rounded bg-black font-medium text-white text-xs" >Continue</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}