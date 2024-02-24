"use client";
import Header from "@/components/common/Header";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { getCourseAction } from "@/store/actions/course";
import { BASE_URL } from "@/utils/axios";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Player from 'react-player';

export default function CourseDetailed({ params }: any) {

    const { courseId } = params;

    const dispatch: TypeDispatch = useDispatch();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [videoOpen, setVideoOpen] = useState<boolean>(false);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);

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
            <Header />
            {videoOpen && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    <div className="relative bg-white flex flex-col items-center justify-center h-5/6 w-10/12 p-8">
                        <button className="absolute top-4 right-4" onClick={() => { setVideoOpen(false) }} >
                            <img src="/icons/close-icon.png" alt="" className="w-8" />
                        </button>
                        <Player url={`${BASE_URL}/api/course/video/${selectedLesson?.video}`} controls width="840" height="460" />
                    </div>
                </div>
            )}
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full px-44 pt-10 pb-16">
                    <div className="w-full h-full secondary-bg rounded-lg px-8 py-12 flex gap-8">
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
                                    className="cursor-pointer flex items-center justify-center gap-2 bg-white shadow p-2 rounded">
                                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${lesson?.thumbnail}`} alt="" className="w-1/3" />
                                    <div className="flex flex-col items-start w-2/3">
                                        <h3 className="line-clamp-1 font-medium text-sm">{lesson?.title}</h3>
                                        <p className="line-clamp-2 font-light text-xs">{lesson?.description}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="w-full mt-8 px-8">
                        <h2 className="font-medium text-2xl">{course?.title}</h2>
                        <p className="font-light text-sm mt-2">
                            {course?.description}
                        </p>
                        <h2 className="font-medium text-sm mt-2">Category : <span className="font-light">{course?.categoryRef.title}</span></h2>
                        <h2 className="font-medium text-sm mt-1">Instructor : <span className="font-light">{course?.instructorRef.username} ({course?.instructorRef.email})</span></h2>
                        <h2 className="font-medium text-sm mt-1">No of lessons : <span className="font-light">{course?.lessons?.length}</span></h2>
                        <h2 className="font-medium text-sm mt-1">Language : <span className="font-light">{course?.language}</span></h2>
                        <h2 className="font-medium text-sm mt-1">Pricing : <span className="font-light">{course?.prcing?.type}<span className="text-green-800">(₹.{course?.pricing?.amount})</span></span></h2>
                    </div>
                </div>
            )}
        </>
    )
}
