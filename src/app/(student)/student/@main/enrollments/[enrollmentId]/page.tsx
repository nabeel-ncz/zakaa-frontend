'use client';
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { getAssessmentsByCourseIdAction } from "@/store/actions/course";
import { getEnrollmentsByIdAction } from "@/store/actions/enrollment";
import { BASE_URL } from "@/utils/axios";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";

export default function page({ params }: any) {

    const { enrollmentId }: { enrollmentId: string } = params;

    const dispatch: TypeDispatch = useDispatch();
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [videoOpen, setVideoOpen] = useState(false);
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [assessments, setAssessments] = useState<any[] | null>(null)

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {
            const result = await dispatch(getEnrollmentsByIdAction({
                id: enrollmentId
            }));

            const assessments = await dispatch(getAssessmentsByCourseIdAction({
                courseId: result.payload?.data?.courseId?._id
            }));

            setEnrollment(result.payload?.data);
            setCourse(result.payload?.data?.courseId);
            setAssessments(assessments.payload?.data);
        
        } catch (error) {
            console.log(error);
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
                    {videoOpen && (
                        <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                            <div className="relative bg-white flex flex-col items-center justify-center h-5/6 w-10/12 p-8">
                                <button className="absolute top-4 right-4" onClick={() => { setVideoOpen(false) }} >
                                    <img src="/icons/close-icon.png" alt="" className="w-8" />
                                </button>
                                <div className="h-5/6">
                                    <ReactPlayer url={`${BASE_URL}/api/course/video/${course?._id}/${selectedLesson?.video}`} controls height="100%" style={{ aspectRatio: '16:9' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="w-full px-6 pt-2 pb-16">
                        <div className="w-full secondary-bg rounded-lg px-8 py-12 flex gap-8">
                            <div className="w-8/12 relative">
                                {selectedLesson ? (
                                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${selectedLesson?.thumbnail}`} alt="" className="w-full rounded" />
                                ) : (
                                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${course?.thumbnail}`} alt="" className="w-full rounded" />
                                )}
                                {selectedLesson && (
                                    <div
                                        onClick={() => { setVideoOpen(true) }}
                                        className="absolute left-[48%] top-[48%] w-12 h-12 opacity-50 hover:opacity-100 cursor-pointer">
                                        <img src="/icons/play.png" alt="" className="" />
                                    </div>
                                )}
                            </div>
                            <div className="w-4/12 flex flex-col gap-2">

                                {course?.trial?.video && (
                                    <div
                                        onClick={() => { setSelectedLesson(course?.trial) }}
                                        className="cursor-pointer flex items-center justify-center gap-2 bg-white shadow p-2 rounded">
                                        <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${course?.trial?.thumbnail}`} alt="" className="w-1/3" />
                                        <div className="flex flex-col items-start w-2/3">
                                            <h3 className="line-clamp-1 font-medium text-sm">{course?.trial?.title}</h3>
                                            <p className="line-clamp-2 font-light text-xs">{course?.trial?.description}</p>
                                        </div>
                                    </div>
                                )}

                                {course?.lessons?.map((lesson: any) => (
                                    <div
                                        onClick={() => { setSelectedLesson(lesson) }}
                                        className="cursor-pointer relative flex items-center justify-center gap-2 bg-white shadow p-2 rounded">
                                        <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${lesson?.thumbnail}`} alt="" className="w-1/3" />
                                        <div className="flex flex-col items-start w-2/3">
                                            <h3 className="line-clamp-1 font-medium text-sm">{lesson?.title}</h3>
                                            <p className="line-clamp-2 font-light text-xs">{lesson?.description}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="w-full mt-8 px-8 flex">
                            <div className="w-2/3 flex flex-col items-start">
                                <h2 className="font-semibold text-2xl">{course?.title}</h2>
                                <p className="font-semibold text-gray-600 text-sm mt-2">
                                    {course?.description}
                                </p>
                                <h2 className="font-semibold text-sm mt-2">Category : <span className="text-gray-600">{course?.categoryRef.title}</span></h2>
                                <h2 className="font-semibold text-sm mt-1">Instructor : <span className="text-gray-600">{course?.instructorRef.username} ({course?.instructorRef.email})</span></h2>
                                <h2 className="font-semibold text-sm mt-1">No of lessons : <span className="text-gray-600">{course?.lessons?.length}</span></h2>
                                <h2 className="font-semibold text-sm mt-1">Language : <span className="text-gray-600">{course?.language}</span></h2>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
