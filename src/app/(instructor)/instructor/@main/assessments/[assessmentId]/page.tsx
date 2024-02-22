"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import { TypeDispatch } from "@/store";
import { getAssessmentByIdAction, updateAssessmentQuestionAction } from "@/store/actions/course";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page({ params }: any) {

    const { assessmentId } = params;
    const dispatch: TypeDispatch = useDispatch();
    const [exam, setExam] = useState<any>(null);
    const [questionUpdating, setQuestionUpdating] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({
        _id: "",
        question: "",
        options: {
            1: "",
            2: "",
            3: "",
            4: ""
        },
        answer: ""
    });

    const router = useRouter();

    useEffect(() => {
        dispatch(getAssessmentByIdAction({
            id: assessmentId
        })).then((res) => {
            if (res.payload?.success) {
                setExam(res.payload?.data);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleChange = (evt: any) => {
        if (evt.target.name.split("_")[0] === "option") {
            setFormState((state) => ({
                ...state,
                options: {
                    ...state.options,
                    [evt.target.name.split("_")[1]]: evt.target.value
                }
            }));
            return;
        }
        setFormState((state) => ({
            ...state,
            [evt.target.name]: evt.target.value
        }));
    }

    const handleQuestionUpdateSubmition = async () => {

        if (!formState._id || !formState.question || !formState.answer) {
            return;
        }

        if (!formState.options[1] || !formState.options[2] || !formState.options[3] || !formState.options[4]) {
            return;
        }

        try {
            setLoading(true);

            const result: any = await dispatch(updateAssessmentQuestionAction({
                assessmentId: exam._id,
                questionId: formState._id,
                question: formState.question,
                answer: formState.answer,
                options: formState.options
            }));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            const result2 = await dispatch(getAssessmentByIdAction({
                id: assessmentId
            }));

            if (result2?.payload?.success) {
                setExam(result2?.payload?.data);
            }

            setError(null);
            setLoading(false);

            router.replace(`/instructor/assessments/${assessmentId}`);

        } catch (error: any) {
            setError(error?.message || "Something went wrong, try again!");;
            setLoading(false);
        } finally {
            closeQuestionUpdating();
        }
    }

    const handleQuestionUpdating = (data: any) => {
        setFormState({
            ...data
        });
        setQuestionUpdating(true);
    }

    const closeQuestionUpdating = () => {
        setQuestionUpdating(false);
        setFormState({
            _id: "",
            question: "",
            options: {
                1: "",
                2: "",
                3: "",
                4: ""
            },
            answer: ""
        });
    }

    return (
        <>
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
                    <h2 className="absolute top-[60%] font-medium">Resources are processing, Please wait!</h2>
                </div>
            )}

            {questionUpdating && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    <div className="w-1/2 px-12 py-6 bg-white flex flex-col items-center justify-center rounded-md gap-2">

                        <h2 className="w-full text-start font-medium text-xs mb-1 ">Question <span className="text-red-700">*</span></h2>
                        <input
                            value={formState.question}
                            onChange={handleChange}
                            name="question"
                            type="text"
                            placeholder="Write your question"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {!formState.question && <span className="custom-form-error">Question is required</span>}

                        <h2 className="mt-2 w-full text-start font-medium text-xs mb-1 ">Option 1 <span className="text-red-700">*</span></h2>
                        <input
                            value={formState.options[1]}
                            onChange={handleChange}
                            name="option_1"
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {!formState.options[1] && <span className="custom-form-error">Option 1 is required</span>}

                        <h2 className="mt-2 w-full text-start font-medium text-xs mb-1 ">Option 2 <span className="text-red-700">*</span></h2>
                        <input
                            value={formState.options[2]}
                            onChange={handleChange}
                            name="option_2"
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {!formState.options[2] && <span className="custom-form-error">Option 2 is required</span>}

                        <h2 className="mt-2 w-full text-start font-medium text-xs mb-1 ">Option 3 <span className="text-red-700">*</span></h2>
                        <input
                            value={formState.options[3]}
                            onChange={handleChange}
                            name="option_3"
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {!formState.options[3] && <span className="custom-form-error">Option 3 is required</span>}

                        <h2 className="mt-2 w-full text-start font-medium text-xs mb-1 ">Option 4 <span className="text-red-700">*</span></h2>
                        <input
                            value={formState.options[4]}
                            onChange={handleChange}
                            name="option_4"
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        />
                        {!formState.options[4] && <span className="custom-form-error">Option 4 is required</span>}

                        <h2 className="mt-2 w-full text-start font-medium text-xs mb-1 ">Answer <span className="text-red-700">*</span></h2>
                        <select
                            name={"answer"}
                            value={formState.answer}
                            onChange={handleChange}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
                        >
                            <option value={""}>Select the correct answer</option>
                            <option value={"1"}>Option 1</option>
                            <option value={"2"}>Option 2</option>
                            <option value={"3"}>Option 3</option>
                            <option value={"4"}>Option 4</option>
                        </select>
                        {!formState.answer && <span className="custom-form-error">Answer is required</span>}

                        <div className="w-full flex items-center justify-end gap-2">
                            <button onClick={closeQuestionUpdating} className="border border-purple-800 px-4 py-2 rounded text-sm font-medium text-purple-800">Close</button>
                            <button onClick={handleQuestionUpdateSubmition} className="bg-purple-800 px-4 py-2 rounded text-sm font-medium text-white">Submit</button>
                        </div>
                    </div>
                </div>
            )}
            {exam && (

                <div className="w-full min-h-screen">
                    <div className="w-full flex px-10 items-center justify-end gap-2">
                        <button onClick={() => {
                            router.push(`${assessmentId}/update`);
                        }} className="bg-purple-800 px-3 py-1 rounded text-sm font-medium text-white">Update</button>
                    </div>
                    <div className="w-full flex flex-col px-4 py-4 gap-6">
                        <h2 className="font-bold text-3xl">Title : {exam.title.split(" ").map((word: string, index: number, array: string[]) => (
                            <span key={index} className={index === array.length - 1 ? "text-purple-800" : ""}>
                                {word + " "}
                            </span>
                        ))}
                        </h2>
                        <div className="flex flex-col gap gap-2">
                            <h2 className="font-medium text-base">Total number of questions : {exam.questions?.length}</h2>
                            <h2 className="font-medium text-base">Total Score : {exam.totalScore}</h2>
                            <h2 className="font-medium text-base">Passing Score : {exam.passingScore}</h2>
                            <h2 className="font-medium text-base">Exam attached to : </h2>
                            <div className="flex items-center justify-start gap-2 bg-white p-2 shadow w-fit">
                                <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${exam.courseId?.thumbnail}`} alt="" className="w-32" />
                                <div className="flex flex-col items-start opacity-50">
                                    <h2 className="font-medium text-base">- {exam.courseId.title}</h2>
                                    <h2 className="font-medium text-base">- {exam.courseId.lessons.find((item: any) => item._id === exam.lessonId)?.title || "nil"}</h2>
                                </div>
                            </div>


                        </div>
                        <div className="flex flex-col gap-4">
                            {exam.questions?.map((item: any, index: number) => (
                                <>
                                    <div className="flex items-center justify-start gap-2">
                                        <h2 className="font-medium text-base"> Q{index + 1} : {item.question}</h2>
                                        <button onClick={() => { handleQuestionUpdating(item) }} className="bg-purple-800 px-3 py-1 rounded text-xs font-medium text-white">Update</button>
                                    </div>
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

                    </div>
                </div>
            )}
        </>
    )
}
