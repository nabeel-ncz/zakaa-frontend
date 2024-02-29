'use client';
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { getAssessmentsByCourseIdAction } from "@/store/actions/course";
import { getEnrollmentsByIdAction } from "@/store/actions/enrollment";
import { BASE_URL } from "@/utils/axios";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    const [assessments, setAssessments] = useState<any[] | null>(null);
    const [assessmentAvailable, setAssessmentAvailable] = useState<any>(null);
    const [user, setUser] = useState<any | null>(null);
    const [attendExam, setAttendExam] = useState<boolean>(false);
    const [currQuestion, setCurrQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<any>({});

    useEffect(() => {
        handleFetch();
    }, []);

    const handleLessonChange = (lesson: any) => {
        setSelectedLesson(lesson);
        setAssessmentAvailable(null);
        assessments?.forEach((item) => {
            if (item.lessonId?.toString() === lesson._id?.toString()) {
                setAssessmentAvailable(item)
            }
        })
    };

    const handleFetch = async () => {
        try {

            const user = await dispatch(fetchUserAction());

            const result = await dispatch(getEnrollmentsByIdAction({
                id: enrollmentId
            }));

            const assessments = await dispatch(getAssessmentsByCourseIdAction({
                courseId: result.payload?.data?.courseId?._id
            }));

            setUser(user.payload?.data);
            setEnrollment(result.payload?.data);
            setCourse(result.payload?.data?.courseId);
            setAssessments(assessments.payload?.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitExam = async () => {
        if (Object.keys(answers)?.length !== assessmentAvailable.questions?.length) {
            toast.error("Please complete the exam before submitting it", { position: "top-right" });
            return;
        };

    }

    const handleNextQuestion = () => {
        if (assessmentAvailable?.questions?.length === (currQuestion + 1)) return;
        setCurrQuestion((prev) => prev + 1);
    }

    const handlePrevQuestion = () => {
        if (currQuestion === 0) return;
        setCurrQuestion((prev) => prev - 1);
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {attendExam && (
                        <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                            <div className="relative bg-white flex flex-col items-center justify-center h-5/6 w-6/12 p-8">
                                <button className="absolute top-4 right-4" onClick={() => { setAttendExam(false) }} >
                                    <img src="/icons/close-icon.png" alt="" className="w-8" />
                                </button>
                                <h2 className="w-full text-start font-bold text-lg mb-1 ">{currQuestion + 1}. {assessmentAvailable.questions[currQuestion].question} <span className="text-purple-800">?</span></h2>
                                {Object.entries(assessmentAvailable?.questions[currQuestion]?.options)?.map(([key, value]: any) => (
                                    <div
                                        onClick={() => {
                                            setAnswers((state: any) => ({
                                                ...state,
                                                [currQuestion]: key as string
                                            }))
                                        }}
                                        className={`${answers[currQuestion] === key ? "bg-gray-200" : "bg-white"} cursor-pointer w-full ps-4 py-2 border rounded mt-2 font-semibold`} >
                                        {value}
                                    </div>
                                ))}
                                <div className="w-full flex items-center justify-center gap-2 mt-2">
                                    <button onClick={handlePrevQuestion} className={`${currQuestion === 0 ? "opacity-40" : ""} border border-purple-800 px-4 py-2 rounded text-sm font-medium text-purple-800`}>Prev</button>
                                    {assessmentAvailable?.questions?.length === (currQuestion + 1) ? (
                                        <button onClick={handleSubmitExam} className="bg-purple-800 px-4 py-2 rounded text-sm font-medium text-white">Complete</button>
                                    ) : (
                                        <button onClick={handleNextQuestion} className="bg-purple-800 px-4 py-2 rounded text-sm font-medium text-white">Next</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {videoOpen && (
                        <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                            <div className="relative bg-white flex flex-col items-center justify-center h-5/6 w-10/12 p-8">
                                <button className="absolute top-4 right-4" onClick={() => { setVideoOpen(false) }} >
                                    <img src="/icons/close-icon.png" alt="" className="w-8" />
                                </button>
                                <div className="h-5/6">
                                    <ReactPlayer url={`${BASE_URL}/api/course/video/${course?._id}/${selectedLesson?.video}?userId=${user?._id}`} controls height="100%" style={{ aspectRatio: '16:9' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="w-full px-6 pt-2 pb-8">
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
                                        onClick={() => { handleLessonChange(course?.trial) }}
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
                                        onClick={() => { handleLessonChange(lesson) }}
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
                                {selectedLesson ? (
                                    <>
                                        <h2 className="font-semibold text-2xl">{selectedLesson?.title}</h2>
                                        <p className="font-semibold text-gray-600 text-sm mt-2">
                                            {selectedLesson?.description}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="font-semibold text-2xl">{course?.title}</h2>
                                        <p className="font-semibold text-gray-600 text-sm mt-2">
                                            {course?.description}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {assessmentAvailable && (
                        <div className="w-full px-6 pb-16">
                            <div className="w-full mt-8 px-8 flex flex-col items-start gap-2">
                                <h2 className="font-semibold text-2xl">{assessmentAvailable.title}</h2>
                                <p className="font-semibold text-gray-600 text-sm">
                                    Total No of questsions : {assessmentAvailable.questions?.length}
                                </p>
                                <p className="font-semibold text-gray-600 text-sm">
                                    Total Score : {assessmentAvailable.totalScore}
                                </p>
                                <p className="font-semibold text-gray-600 text-sm">
                                    Passing Score : {assessmentAvailable.passingScore}
                                </p>
                                <p className="font-semibold text-gray-600 text-sm">
                                    Last updated : {new Date(`${assessmentAvailable.updatedAt}`).toLocaleString()}
                                </p>
                                <button onClick={() => {
                                    setAttendExam(true);
                                }} className="font-semibold text-sm px-3 py-1 rounded bg-purple-800 text-white">
                                    Attend Exam
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
