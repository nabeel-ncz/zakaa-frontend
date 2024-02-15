"use client";
import LoaderSm from "@/components/ui/LoaderSm";
import Skeleton from "@/components/ui/Skeleton";
import { TypeDispatch, TypeState } from "@/store";
import { acceptApplicationAction, getAllApplicationsAction } from "@/store/actions/applications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Applications() {

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<any>(null);
    const dispatch: TypeDispatch = useDispatch();
    const data: any = useSelector((state: TypeState) => state.application.data);

    useEffect(() => {
        dispatch(getAllApplicationsAction()).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    const handleApplicationAccept = (id: string, email: string) => {
        setUpdating({
            _id: id,
        });
        dispatch(acceptApplicationAction({
            id,
            email
        })).then(() => dispatch(getAllApplicationsAction())).finally(() => {
            setUpdating(null);
        });
    }

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
                                    _id: string,
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
                                        <td
                                            className="font-normal p-4 text-left border-r"
                                        >
                                            {(updating && updating?._id === item._id) ? (
                                                <>
                                                    <button className="primary-bg h-8 w-24 flex items-center justify-center rounded text-white font-medium text-sm"><LoaderSm /></button>
                                                </>
                                            ) : (item.accepted ? (
                                                <>
                                                    <button className="primary-bg h-8 w-24 flex items-center justify-center rounded text-white font-medium text-sm">Accepted!</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => { handleApplicationAccept(item._id, item.email) }}
                                                        className="primary-bg h-8 w-24 flex items-center justify-center rounded text-white font-medium text-sm"
                                                    >Accept</button>
                                                </>
                                            ))}
                                        </td>
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