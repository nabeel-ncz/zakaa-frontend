"use client";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Courses() {

    const router = useRouter();
    const [pendingCourse, setPendingCourse] = useState<any>(null);

    useEffect(() => {
        const course = getObject("course")
        if (course) {
            setPendingCourse(course);
        }
    }, []);

    const handleDelete = () => {
        deleteObject("course");
        setPendingCourse(null);
    }

    const navigateToCreate = () => {
        if (getObject("course")) {
            toast.error("Complete you pending course!", { position: 'top-right' });
            return;
        }
        router.push("courses/create");
    }

    const navigateToLesson = () => {
        const course = getObject("course");
        if(Number(course.numberOfLessons) === course.lessons.length){
            router.push(`courses/create/finish`);
        }
        if (Number(course.numberOfLessons) > course.lessons.length) {
            router.push(`courses/create/${course.lessons.length + 1}`);
        }
    }

    return (
        <div className="w-full min-h-screen px-10 py-4">
            <div className="flex items-end justify-end w-full">
                <button className="px-4 py-2 rounded border-[rgba(127,39,194,0.5)] border-2 bg-white font-medium" onClick={navigateToCreate}>Create</button>
            </div>
            {pendingCourse && (<>
                <div className="w-[17rem] relative bg-white h-64 shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${pendingCourse.thumbnail}`} alt="" className="w-11/12 h-36" />
                    <div className="flex flex-col items-start justify-start w-11/12">
                        <h2 className="mt-2 font-medium text-md text-wrap">{pendingCourse?.title}</h2>
                        <p className="text-xs font-light line-clamp-2">{pendingCourse.description}</p>
                        <div className="flex w-full items-center justify-end mt-4 gap-2">
                            <button className="px-4 py-1 rounded bg-black font-medium text-white text-xs" onClick={handleDelete}>Delete</button>
                            <button className="px-4 py-1 rounded bg-purple-600 font-medium text-white text-xs" onClick={navigateToLesson}>Continue</button>
                        </div>
                    </div>
                </div>
            </>)}
            
        </div>
    )
}