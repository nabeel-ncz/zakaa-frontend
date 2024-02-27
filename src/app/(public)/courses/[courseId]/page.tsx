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
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentSessionAction } from "@/store/actions/payment";
import { fetchUserAction } from "@/store/actions";
import toast from "react-hot-toast";
import { storeObject } from "@/utils/localStorage";
import { createEnrollmentAction } from "@/store/actions/enrollment";

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

    const handleEnrollment = async () => {
        if (course?.pricing?.type === "paid") {
            handlePayment();
            return;
        }
        try {
            const user = await dispatch(fetchUserAction());
            if (!user.payload || !user.payload?.success) {
                throw new Error("Authentication required");
            }
            const result = await dispatch(createEnrollmentAction({
                userId: user.payload?.data?._id,
                courseId: course?._id,
                enrolledAt: Date.now()
            }));

            if(!result.payload?.success){
                throw new Error("Enrollment failed, try again!");
            };

        } catch (error: any) {
            toast.error(error?.message, { position: "top-right" });
        }
    }

    const handlePayment = async () => {
        try {

            const user = await dispatch(fetchUserAction());

            if (!user.payload || !user.payload?.success) {
                toast.error("Please create an account", { position: "top-right" });
                return;
            }

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as unknown as string);

            const response = await dispatch(createPaymentSessionAction({
                courseName: course?.title,
                courseThumbnail: course?.thumbnail,
                courseId: course?._id,
                amount: course?.pricing?.amount,
                userId: user?.payload?.data?._id
            }));

            if (!response?.payload || !response?.payload?.success) {
                throw new Error("Something went wrong, Try again!");
            }

            storeObject("payment_session", {
                ...response.payload?.data,
                amount: course?.pricing?.amount
            });

            const sessionId = response?.payload?.data?.sessionId;

            const result = await stripe?.redirectToCheckout({
                sessionId: sessionId
            })

            if (result?.error) {
                throw new Error(result?.error?.message);
            }

        } catch (error: any) {
            toast.error(error?.message, { position: "bottom-right" });
        }
    }

    return (
        <>
            <Header />
            {videoOpen && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    <div className="relative bg-white flex flex-col items-center justify-center h-5/6 w-10/12 p-8">
                        <button className="absolute top-4 right-4" onClick={() => { setVideoOpen(false) }} >
                            <img src="/icons/close-icon.png" alt="" className="w-8" />
                        </button>
                        <div className="h-5/6">
                            <Player url={`${BASE_URL}/api/course/video/${course?._id}/${selectedLesson?.video}`} controls height="100%" style={{ aspectRatio: '16:9' }} />
                        </div>
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
                    <div className="w-full mt-8 px-8 flex">
                        <div className="w-2/3 flex flex-col items-start">
                            <h2 className="font-semibold text-2xl">{course?.title}</h2>
                            <p className="font-normal text-sm mt-2">
                                {course?.description}
                            </p>
                            <h2 className="font-semibold text-sm mt-2">Category : <span className="font-normal">{course?.categoryRef.title}</span></h2>
                            <h2 className="font-semibold text-sm mt-1">Instructor : <span className="font-normal">{course?.instructorRef.username} ({course?.instructorRef.email})</span></h2>
                            <h2 className="font-semibold text-sm mt-1">No of lessons : <span className="font-normal">{course?.lessons?.length}</span></h2>
                            <h2 className="font-semibold text-sm mt-1">Language : <span className="font-normal">{course?.language}</span></h2>
                        </div>
                        <div className="w-1/3 flex flex-col items-start justify-end">
                            <h2 className="font-semibold text-sm mt-2">Pricing : <span className="font-normal">{course?.pricing?.type}</span></h2>
                            <h2 className="font-semibold text-sm mt-2">Amount : <span className={`font-normal ${course?.pricing?.type === "paid" && "line-through"}`}>{course?.pricing?.type === "paid" ? course?.pricing?.amount : "0"}</span></h2>
                            <button className="h-10 custom-form-button bg-purple-800" onClick={handleEnrollment}>Enroll</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
