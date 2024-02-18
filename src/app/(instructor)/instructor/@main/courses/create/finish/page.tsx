"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import LessonCard from "@/components/user/LessonCard";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function CourseCreationFinish() {

    const router = useRouter();
    const [pendingCourse, setPendingCourse] = useState<any>(null);

    useEffect(() => {
        const course = getObject("course");
        if(!course){
            router.back();
            toast.error("Please finish your pending course");
            return;
        }
        if (course?.lessons?.length < course.numberOfLessons) {
            router.back();
            toast.error("Please finish your pending course");
            return;
        }
        setPendingCourse(course);
    }, []);

    return (
        <div className="w-full min-h-screen">
            {pendingCourse ? (
                <>
                    <div className="w-full flex items-center justify-between px-10 py-4">
                        <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${pendingCourse.thumbnail}`} alt="" className="w-1/2" />
                        <div className="flex flex-col items-start justify-center">
                            <h2>{pendingCourse.title}</h2>
                            <p>{pendingCourse.description}</p>
                        </div>
                    </div>
                    <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                        {pendingCourse?.lessons?.map((item: any) => (
                            <LessonCard
                                title={item.title}
                                description={item.description}
                                image={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.thumbnail}`}
                                loading={false}
                            />
                        ))}
                    </div>
                    <div className="w-full flex px-10 items-center justify-end gap-2">
                        <button className="font-medium px-6 py-2 rounded bg-white">Cancel</button>
                        <button className="font-medium px-6 py-2 rounded bg-white">Complete</button>
                    </div>
                </>
            ) : <BanterLoader />}
        </div>
    )
}
