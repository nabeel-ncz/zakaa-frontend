"use client";
import LoaderSm from "@/components/ui/LoaderSm";
import { TypeDispatch, TypeState } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { updateCourseAction } from "@/store/actions/course";
import { getInstructorCoursesAction } from "@/store/actions/course/getInstructorCoursesAction";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Courses() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const user: any = useSelector((state: TypeState) => state.user.data);
    const [pendingCourse, setPendingCourse] = useState<any>(null);
    const [createdCourses, setCreatedCourses] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const course = getObject("course")
        if (course) {
            setPendingCourse(course);
        }
    }, []);

    useEffect(() => {
        handleGetCourses();
    }, []);

    const handleGetCourses = () => {
        dispatch(fetchUserAction()).then((res1) => {
            if (res1.payload.success) {
                dispatch(getInstructorCoursesAction({
                    instructorId: res1.payload?.data?._id
                })).then((res2) => {
                    if (res2.payload.success) {
                        setCreatedCourses(res2.payload.data);
                    }
                })
            }
        });
    }


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
        if (Number(course?.numberOfLessons) === course?.lessons.length) {
            router.push(`courses/create/finish`);
            return;
        }
        if (Number(course?.numberOfLessons) > course?.lessons.length) {
            router.push(`courses/create/${course?.lessons.length + 1}`);
            return;
        }
    }

    const handlePublishing = (data: any) => {
        setLoading(true);
        dispatch(updateCourseAction({
            ...data,
            isPublished: !data.isPublished
        })).finally(() => {
            handleGetCourses();
            setLoading(false);
        });
    };

    return (
        <div className="w-full min-h-screen">
            <div className="flex px-10 items-end justify-end w-full">
                <button className="px-4 py-2 rounded border-[rgba(127,39,194,0.5)] border-2 bg-white font-medium" onClick={navigateToCreate}>Create</button>
            </div>

            {!pendingCourse && (!createdCourses || createdCourses.length === 0) && (
                <div className="w-full pe-6 pt-12 flex flex-col gap-2 items-center justify-center">
                    <img src="/icons/not-found.png" alt="" className="h-80" />
                    <h2 className="font-bold text-xl">No courses found!</h2>
                </div>
            )}


            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                {pendingCourse && (<>
                    <div className="w-[17rem] relative bg-white h-[17rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                        <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${pendingCourse.thumbnail}`} alt="" className="w-11/12 h-36" />
                        <div className="absolute flex items-center justify-center w-11/12 h-36 bg-[rgba(0,0,0,0.5)] top-3 backdrop-blur-sm">
                            <h1 className="font-medium text-white">Pending course</h1>
                        </div>
                        <div className="flex flex-col items-start justify-start w-11/12">
                            <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">{pendingCourse?.title}</h2>
                            <p className="text-xs font-light line-clamp-2">{pendingCourse.description}</p>
                            <div className="flex w-full items-center justify-end mt-4 gap-2">
                                <button className="px-4 py-1 rounded border border-black font-medium text-black text-xs" onClick={handleDelete}>Delete</button>
                                <button className="px-4 py-1 rounded bg-black font-medium text-white text-xs" onClick={navigateToLesson}>Continue</button>
                            </div>
                        </div>
                    </div>
                </>)}
                {createdCourses?.map((item: any) => (
                    <>
                        <div className="w-[17rem] relative bg-white h-[17rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                            <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.thumbnail}`} alt="" className="w-11/12 h-36" />
                            <div className="flex flex-col items-start justify-start w-11/12">
                                <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">{item?.title}</h2>
                                <p className="text-xs font-light line-clamp-2">{item.description}</p>
                                <div className="flex w-full items-center justify-end mt-4 gap-2">
                                    <button className="px-4 py-1 rounded border border-black font-medium text-black text-xs" onClick={() => {
                                        handlePublishing(item);
                                    }}>
                                        {loading ? <LoaderSm /> : (
                                            item.isPublished ? "UnPublish" : "Publish"
                                        )}
                                    </button>
                                    <button className="px-4 py-1 rounded bg-black font-medium text-white text-xs" onClick={() => {
                                        router.push(`courses/${item._id}`);
                                    }}>View</button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

        </div>
    )
}