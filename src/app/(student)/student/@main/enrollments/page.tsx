"use client";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { getEnrollmentsByUserIdAction } from "@/store/actions/enrollment";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Enrollments() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [enrollments, setEnrollments] = useState<any[] | null>(null);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = async () => {
        try {

            const user = await dispatch(fetchUserAction());

            const result = await dispatch(getEnrollmentsByUserIdAction({
                userId: user.payload?.data?._id
            }));

            setEnrollments(result?.payload?.data);

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
                    {(!enrollments || enrollments.length === 0) ? (
                        <div className="w-full pe-6 pt-12 flex flex-col gap-2 items-center justify-center">
                            <img src="/icons/not-found.png" alt="" className="h-80" />
                            <h2 className="font-bold text-xl">No enrollments found!</h2>
                        </div>
                    ) : (
                        <div className="w-full min-h-screen">
                            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                                {enrollments?.map((item: any) => (
                                    <>
                                        <div className="w-[17rem] relative bg-white h-[17rem] shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                                            <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.courseId?.thumbnail}`} alt="" className="w-11/12 h-36" />
                                            <div className="flex flex-col items-start justify-start w-11/12">
                                                <h2 className="mt-2 font-medium text-md text-wrap line-clamp-1">{item.courseId?.title}</h2>
                                                <p className="text-xs font-light line-clamp-2">{item.courseId?.description}</p>
                                                <div className="flex w-full items-center justify-end mt-4 gap-2">
                                                    <button className="px-4 py-1 rounded bg-black font-medium text-white text-xs" onClick={() => {
                                                        router.push(`enrollments/${item._id}`);
                                                    }}>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}