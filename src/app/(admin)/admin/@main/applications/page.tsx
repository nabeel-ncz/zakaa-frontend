"use client";
import Skeleton from "@/components/ui/Skeleton";
import { TypeDispatch, TypeState } from "@/store";
import { getAllApplicationsAction } from "@/store/actions/applications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Applications() {

    const [loading, setLoading] = useState(true);
    const dispatch: TypeDispatch = useDispatch();
    const data: any = useSelector((state: TypeState) => state.application.data);

    useEffect(() => {
        dispatch(getAllApplicationsAction()).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <>
                    <Skeleton width="100%" height="100px" />
                    
                </>
            ) : (
                <>
                    <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
                        <table className="w-full min-w-max table-auto">
                            <thead className="font-normal">
                                <tr className="border-b border-gray-200">
                                    <th className="font-semibold p-4 text-left border-r">User</th >
                                    <th className="font-semibold p-4 text-left border-r">Phone</th>
                                    <th className="font-semibold p-4 text-left border-r">Profession</th>
                                    <th className="font-semibold p-4 text-left border-r">Description</th>
                                    <th className="font-semibold p-4 text-left border-r">Status</th>
                                </tr >
                            </thead >
                            <tbody>
                                {data?.map((item: {
                                    email: string,
                                    phone: string,
                                    profession: string,
                                    profileDescription: string,
                                    accepted: string
                                }) => (
                                    <tr key={item.email} className="border-b border-gray-200">
                                        <td className="font-normal p-4 text-left border-r">{item.email}</td>
                                        <td className="font-normal p-4 text-left border-r">{item.phone}</td>
                                        <td className="font-normal p-4 text-left border-r">{item?.profession}</td>
                                        <td className="font-normal p-4 text-left border-r">{item.profileDescription}</td>
                                        <td className="font-normal p-4 text-left border-r">{item.accepted ? "Accepted!" : "Not Accepted!"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    </div >
                </>
            )
            }
        </>
    )
}