'use client';
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { fetchUserAction, getExamResultsByUserIdAction } from "@/store/actions";
import { getAvailableCategoriesAction } from "@/store/actions/category";
import { getEnrollmentsByUserIdAction } from "@/store/actions/enrollment";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Overview() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [recentEnrollments, setRecentEnrollmetns] = useState<any[] | null>(null);
    const [examSuccessRate, setExamSuccessRate] = useState<number>(0);
    const [focusCategory, setFocusCategory] = useState<string>("nil");

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {

            const user = await dispatch(fetchUserAction());
            const result = await dispatch(getExamResultsByUserIdAction({
                userId: user?.payload?.data?._id
            }));

            const enrollments = await dispatch(getEnrollmentsByUserIdAction({
                userId: user.payload?.data?._id
            }));

            let passed: number = 0;
            result.payload?.data?.forEach((item: any) => {
                if (item?.assessmentRef?.passingScore <= item?.score) {
                    passed++;
                }
            });
            let attended: number = result.payload.data?.length;

            const mostRepeatedCategory = findMostRepeatingCategory(enrollments.payload?.data);

            if (mostRepeatedCategory) {
                const categories = await dispatch(getAvailableCategoriesAction());
                const categ = categories.payload?.data.find((item: any) => item._id?.toString() === mostRepeatedCategory);
                setFocusCategory(categ.title);
            }
            if (attended > 0) {
                setExamSuccessRate(((passed / attended) * 100));
            }

            setRecentEnrollmetns(enrollments.payload?.data);

        } catch (error: any) {
            toast.error(error?.message || "Somthing went wrong!", { position: "top-right" })
        } finally {
            setLoading(false);
        }
    }

    const findMostRepeatingCategory = (enrollments: any[]) => {
        const categoryCounts: any = {};

        enrollments.forEach(enrollment => {
            const category = enrollment.courseId.categoryRef;
            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        });

        let mostRepeatedCategory = null;
        let maxCount = 0;
        for (const category in categoryCounts) {
            if (categoryCounts[category] > maxCount) {
                mostRepeatedCategory = category;
                maxCount = categoryCounts[category];
            }
        }

        return mostRepeatedCategory;
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="w-full px-12">
                        <div className="flex items-center justify-between gap-12">
                            <div className="w-1/3 relative bg-white flex shadow rounded px-4 py-4 items-center justify-around">
                                <div className="flex flex-col font-bold text-lg">
                                    <span>Today's watch activity</span>
                                    <span>{"2"}+ Hrs</span>
                                </div>
                                <img src="/icons/heartbeat.png" alt="" className="w-18 opacity-75" />
                                <span className="absolute w-2 h-12 bg-purple-800 left-0 top-[25%] opacity-80"></span>
                            </div>
                            <div className="w-1/3 relative bg-white flex shadow rounded px-4 py-4 items-center justify-around">
                                <div className="flex flex-col font-bold text-lg">
                                    <span>Exam success rate</span>
                                    <span>{examSuccessRate}%</span>
                                </div>
                                <img src="/icons/exam.png" alt="" className="w-14 opacity-75" />
                                <span className="absolute w-2 h-12 bg-purple-800 left-0 top-[25%] opacity-80"></span>
                            </div>
                            <div className="w-1/3 relative bg-white flex shadow rounded px-4 py-4 items-center justify-around">
                                <div className="flex flex-col font-bold text-lg">
                                    <span>Focus Category</span>
                                    <span>{focusCategory}</span>
                                </div>
                                <img src="/icons/target.png" alt="" className="w-14 opacity-75" />
                                <span className="absolute w-2 h-12 bg-purple-800 left-0 top-[25%] opacity-80"></span>
                            </div>
                        </div>
                        <h2 className="font-bold text-lg mt-10 underline">Recent Enrollments</h2>
                        <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg mt-4">
                            <table className="w-full min-w-max table-auto">
                                <thead className="font-normal">
                                    <tr className="border-b border-gray-200">
                                        <th className="font-semibold p-4 text-left border-r">Course</th >
                                        <th className="font-semibold p-4 text-left border-r">Pricing</th>
                                        <th className="font-semibold p-4 text-left border-r">Progress</th>
                                        <th className="font-semibold p-4 text-left border-r">Enrolled At</th>
                                    </tr >
                                </thead >
                                <tbody>
                                    {recentEnrollments?.map((item: {
                                        _id: string,
                                        courseId: any,
                                        userid: any,
                                        progress: any,
                                        enrolledAt: string
                                    }) => (
                                        <tr key={item._id} className="border-b border-gray-200">
                                            <td className="font-medium text-xs p-4 text-left border-r">
                                                <div className="flex items-center gap-2">
                                                    <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.courseId?.thumbnail}`} alt="" className="h-8" />
                                                    <div className="flex flex-col">
                                                        <h2>{item.courseId?.title}</h2>
                                                        <h2>{item.courseId?.description}</h2>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-medium text-xs p-4 text-left border-r">
                                                <h2>{item.courseId?.pricing?.type} ($.{item.courseId?.pricing?.amount})</h2>
                                            </td>
                                            <td className="font-medium text-xs p-4 text-left border-r">
                                                <div className="flex flex-col items-start">
                                                    <h2>Completed lessons : {item.progress?.completedLessons?.length}</h2>
                                                    <h2>Completed exams : {item.progress?.completedAssessments?.length}</h2>
                                                </div>
                                            </td>
                                            <td className="font-medium text-xs p-4 text-left border-r">
                                                <h2>{new Date(item.enrolledAt).toLocaleString()}</h2>
                                            </td>
                                            <td className="font-medium text-xs p-4 text-left border-r">
                                                <button onClick={() => {
                                                    router.push(`/student/enrollments/${item?._id}`)
                                                }} className="border border-black rounded px-3 py-1 text-xs text-black">continue</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table >
                        </div >
                    </div>
                </>
            )}
        </>
    )
}
