"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import LessonCard from "@/components/user/LessonCard";
import { TypeDispatch } from "@/store";
import { getCourseAction } from "@/store/actions/course";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function CourseDetailed({ params }: any) {

    const { courseId } = params;

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getCourseAction({
            courseId
        })).then((res) => {
            if (res.payload?.success) {
                setCourse(res.payload?.data);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <BanterLoader />
            ) : (
                <>
                    {course && (
                        <>
                            <div className="w-full px-8 flex items-end justify-end py-4">
                                <div>
                                    <button
                                        onClick={() => { router.push(`${courseId}/add-lesson`) }}
                                        className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Add Lesson</button>
                                </div>
                            </div>
                            <div className="px-10">
                                <div className="relative w-full flex items-center justify-between px-4 py-4 gap-8 bg-white rounded shadow-md">
                                    <button onClick={() => { router.push(`${courseId}/update`) }} className="absolute px-2 py-1 rounded bg-black top-2 right-2 text-xs text-white font-medium">update</button>
                                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${course.thumbnail}`} alt="" className="h-48" />
                                    <div className="flex flex-col items-start justify-start gap-1 w-full">
                                        <h2 className="font-bold text-3xl">
                                            {course.title.split(" ").map((word: string, index: number, array: string[]) => (
                                                <span key={index} className={index === array.length - 1 ? "text-purple-800" : ""}>
                                                    {word + " "}
                                                </span>
                                            ))}
                                        </h2>
                                        <p className="text-gray-500 font-medium text-sm line-clamp-3 w-11/12">{course.description}</p>
                                        <p className="text-gray-500 font-medium text-sm">Category : {course?.categoryRef?.title}</p>
                                        <p className="text-gray-500 font-medium text-sm">Number of lessons : {course?.lessons?.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                                {course?.lessons?.map((item: any) => (
                                    <div className="w-[17rem] relative bg-white h-64 shadow-md rounded-md overflow-hidden flex flex-col items-center justify-start pt-4">
                                        <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.thumbnail}`} alt="" className="w-11/12 h-36" />
                                        <div className="flex flex-col items-start justify-start w-11/12">
                                            <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">{item.title}</h2>
                                            <p className="text-xs font-light line-clamp-2">{item.description}</p>
                                        </div>
                                        <button
                                            onClick={() => { router.push(`${courseId}/${item._id}/update`) }}
                                            className="absolute px-2 py-1 rounded bg-black bottom-2 right-2 text-xs text-white font-medium">update</button>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex px-10 items-center justify-end gap-2">

                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}
