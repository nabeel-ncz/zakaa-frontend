"use client";
import LessonCard from "@/components/user/LessonCard";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Courses() {

    const router = useRouter();
    const [pendingCourse, setPendingCourse] = useState(null);

    useEffect(() => {
        const course = getObject("course")
        if (course) {
            setPendingCourse(course);
        }
    }, []);

    const navigateToCreate = () => {
        if (getObject("course")) {
            toast.error("Complete you pending course!", { position: 'top-right' });
            return;
        }
        router.push("courses/create");
    }

    const navigateToLesson = () => {
        const course = getObject("course");
        if (Number(course.numberOfLessons) > course.lessons.length) {
            router.push(`courses/create/${course.lessons.length + 1}`);
        }
    }

    return (
        <div>
            <button onClick={navigateToCreate}>Create</button>
            {pendingCourse && (<>
                <LessonCard image="" title="" description="" loading={false} />
                <button onClick={navigateToLesson}>Continue</button>
                <button onClick={() => { deleteObject("course") }}>Delete</button>
            </>)}
            
        </div>
    )
}