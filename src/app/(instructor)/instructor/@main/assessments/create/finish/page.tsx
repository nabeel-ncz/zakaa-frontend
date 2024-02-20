"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { getCourseAction } from "@/store/actions/course";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function AssessmentFinish() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [exam, setExam] = useState<any>(null);
    const [course, setCourse] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const exam = getObject("exam");

        if (!exam) {
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.replace("/instructor/assessments");
            return;
        }
        if (Number(exam.totalNoOfQuestions) !== exam.questions.length) {
            toast.error("You are not allowed to access the page!", { position: 'top-right' });
            router.replace("/instructor/assessments");
            return;
        }

        setExam(exam);
        
        dispatch(fetchUserAction()).then((res) => {
            if(res.payload.success){
                setUser(res.payload.data);
            }
            dispatch(getCourseAction({ courseId: exam.courseId }))
                .then((res) => {
                    if (res.payload.success) {
                        setCourse(res.payload.data);
                    }
                    setLoading(false);
                });
        });

    }, []);

    const handleSubmition = () => {
        
    };

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
                    <h2 className="absolute top-[60%] font-medium">Assessment is processing, Please wait!</h2>
                </div>
            )}
            {(course && exam) ? (
                <div className="w-full flex flex-col px-4 py-4 gap-6">
                    <h2 className="font-bold text-3xl">Title : {exam.title.split(" ").map((word: string, index: number, array: string[]) => (
                        <span key={index} className={index === array.length - 1 ? "text-purple-800" : ""}>
                            {word + " "}
                        </span>
                    ))}
                    </h2>
                    <div className="flex flex-col gap gap-2">
                        <h2 className="font-medium text-base">Total number of questions : {exam.totalNoOfQuestions}</h2>
                        <h2 className="font-medium text-base">Total Score : {exam.totalScore}</h2>
                        <h2 className="font-medium text-base">Passing Score : {exam.passingScore}</h2>
                        <h2 className="font-medium text-base">Exam attached to : </h2>
                        <div className="flex items-center justify-start gap-2 bg-white p-2 shadow w-fit">
                            <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${course.thumbnail}`} alt="" className="w-32" />
                            <div className="flex flex-col items-start opacity-50">
                                <h2 className="font-medium text-base">- {course.title}</h2>
                                <h2 className="font-medium text-base">- {course.lessons.find((item: any) => item._id === exam.lessonId)?.title || "nil"}</h2>
                            </div>
                        </div>


                    </div>
                    <div className="flex flex-col gap gap-2">
                        {exam.questions?.map((item: any, index: number) => (
                            <>
                                <h2 className="font-medium text-base"> Q{index + 1} : {item.question}</h2>
                                <div className="mb-6 font-medium text-xs gap-2 flex">
                                    {Object.entries(item.options)?.map(([key]) => (
                                        <>
                                            <span className="bg-white rounded shadow px-2 py-1">{item.options[key]}</span>
                                        </>
                                    ))}
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="w-full flex px-10 items-center justify-end gap-2">
                        <button onClick={() => {
                            router.push("/instructor/courses")
                        }} className="font-medium px-6 py-2 rounded bg-white shadow">Cancel</button>
                        <button onClick={handleSubmition} className="font-medium px-6 py-2 rounded bg-purple-800 text-white">Complete</button>
                    </div>
                </div>
            ) : (
                <div className="fixed z-50 top-0 left-0 flex flex-col items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    <BanterLoader />
                </div>
            )}

        </div>
    )
}