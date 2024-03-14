"use client";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store"
import { getEnrollmentsByInstructorIdAction } from "@/store/actions/enrollment";
import { getUserProfileAction } from "@/store/actions/user";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"

export default function Dashboard() {

    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[] | null>(null);
    const [user, setUser] = useState<any>(null);
    const [totalSales, setTotalSales] = useState<number>(0);
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const [totalProfit, setTotalProfit] = useState<number>(0);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {

            const user = await dispatch(getUserProfileAction());

            const enrollments = await dispatch(getEnrollmentsByInstructorIdAction({
                instructorId: user.payload?.data?._id
            }));

            setUser(user.payload?.data);
            setData(enrollments?.payload?.data);

            setTotalSales(enrollments?.payload?.data?.length);
            let unique: any = {};
            enrollments?.payload?.data?.forEach((item: any) => {
                if (unique[item.user?._id]) {
                    unique[item.user?._id] = 1;
                } else {
                    unique[item.user?._id]++;
                }
            })
            setTotalVisitors(Object.keys(unique).length);
            setTotalProfit(user.payload?.data?.profit);

        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full px-12 pt-4">
                    <div className="flex items-center justify-between gap-12">
                        <div className="w-1/3 relative bg-white flex shadow rounded px-4 py-4 items-center justify-around">
                            <div className="flex flex-col font-bold text-lg">
                                <span>Total Sales</span>
                                <span>{totalSales}+</span>
                            </div>
                            <img src="/icons/graph-2.png" alt="" className="w-18" />
                            <span className="absolute w-2 h-12 bg-purple-800 left-0 top-[25%] opacity-80"></span>
                        </div>
                        <div className="w-1/3 relative bg-white flex shadow rounded px-4 py-4 items-center justify-around">
                            <div className="flex flex-col font-bold text-lg">
                                <span>Total Visitors</span>
                                <span>{totalVisitors}+</span>
                            </div>
                            <img src="/icons/graph-1.png" alt="" className="w-18" />
                            <span className="absolute w-2 h-12 bg-purple-800 left-0 top-[25%] opacity-80"></span>
                        </div>
                        <div className="w-1/3 relative bg-white flex shadow rounded px-4 py-4 items-center justify-around">
                            <div className="flex flex-col font-bold text-lg">
                                <span>Total Profit</span>
                                <span>$.{totalProfit}</span>
                            </div>
                            <img src="/icons/graph-3.png" alt="" className="w-18" />
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
                                    <th className="font-semibold p-4 text-left border-r">User</th>
                                    <th className="font-semibold p-4 text-left border-r">Reactions</th>
                                </tr >
                            </thead >
                            <tbody>
                                {data?.map((item: {
                                    _id: string,
                                    course: any,
                                    user: any,
                                    profit: number
                                }) => (
                                    <tr key={item._id} className="border-b border-gray-200">
                                        <td className="font-medium text-xs p-4 text-left border-r max-w-96">
                                            <div className="flex items-center gap-2">
                                                <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.course?.thumbnail}`} alt="" className="h-8" />
                                                <div className="flex flex-col">
                                                    <h2 className="font-bold text-base mb-1 line-clamp-1">{item.course?.title}</h2>
                                                    <h2 className="line-clamp-3">{item.course?.description}</h2>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-medium text-xs p-4 text-left border-r">
                                            <h2>{item.course?.pricing?.type} ($.{item.course?.pricing?.amount})</h2>
                                        </td>
                                        <td className="font-medium text-xs p-4 text-left border-r">
                                            <div className="flex flex-col items-start">
                                                <h2>{item.user?.username}</h2>
                                                <h2>{item.user?.email}</h2>
                                            </div>
                                        </td>
                                        <td className="font-medium text-xs p-4 text-left border-r">
                                            <div className="flex flex-col items-start">
                                                <h2>Likes : 0</h2>
                                                <h2>Comments : 0</h2>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    </div >
                </div >
            )}
        </>
    )
}
