"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import LessonCard from "@/components/user/LessonCard";
import { TypeDispatch, TypeState } from "@/store";
import { createCourseAction } from "@/store/actions/course";
import { getInstructorCoursesAction } from "@/store/actions/course/getInstructorCoursesAction";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


export default function CourseCreationFinish() {

    const router = useRouter();
    const [pendingCourse, setPendingCourse] = useState<any>(null);
    const dispatch: TypeDispatch = useDispatch();
    const user: any = useSelector((state: TypeState) => state.user.data);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const course = getObject("course");
        if (!course) {
            router.replace("/instructor/courses");
            toast.error("Please finish your pending course");
            return;
        }
        if (course?.lessons?.length < course.numberOfLessons) {
            router.replace("/instructor/courses");
            toast.error("Please finish your pending course");
            return;
        }
        setPendingCourse(course);
    }, []);


    const handleSubmition = async () => {
        const { numberOfLessons, pricing, ...data } = pendingCourse;
        let trial = {};
        if (data.trial?.video) {
            trial = {
                ...data.trial,
                thumbnail: data.thumbnail
            };
        };
        try {
            setLoading(true);

            let result: any = await dispatch(createCourseAction({
                ...data,
                instructorRef: user?._id,
                pricing,
                trial
            }))

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            setError(null);
            setLoading(false);

            deleteObject("course");

            router.replace("/instructor/courses");

        } catch (error: any) {
            setError(error?.message || "Something went wrong, try again!");;
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen">
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
                    <h2 className="absolute top-[60%] font-medium">Course is processing, Please wait!</h2>
                </div>
            )}
            {pendingCourse ? (
                <>
                    <div className="px-10">
                        <div className="w-full flex items-center justify-between px-4 py-4 gap-8 bg-white rounded shadow-md">
                            <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${pendingCourse.thumbnail}`} alt="" className="w-1/2 h-48" />
                            <div className="flex flex-col items-start justify-center gap-1">
                                <h2 className="font-bold text-3xl">
                                    {pendingCourse.title.split(" ").map((word: string, index: number, array: string[]) => (
                                        <span key={index} className={index === array.length - 1 ? "text-purple-800" : ""}>
                                            {word + " "}
                                        </span>
                                    ))}
                                </h2>
                                <p className="text-gray-500 font-medium text-sm line-clamp-3 w-11/12">{pendingCourse.description}</p>
                                <p className="text-gray-500 font-medium text-sm">Category : {pendingCourse?.category || "Software development"}</p>
                                <p className="text-gray-500 font-medium text-sm">Number of lessons : {pendingCourse.numberOfLessons}</p>
                            </div>
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
                        <button onClick={() => {
                            router.push("/instructor/courses")
                        }} className="font-medium px-6 py-2 rounded bg-white shadow">Cancel</button>
                        <button onClick={handleSubmition} className="font-medium px-6 py-2 rounded bg-purple-800 text-white">Complete</button>
                    </div>
                </>
            ) : <BanterLoader />}
        </div>
    )
}
