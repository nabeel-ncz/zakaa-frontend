"use client";
import { TypeDispatch } from "@/store";
import { logoutAction } from "@/store/actions/auth/logoutAction";
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";
import toast from "react-hot-toast";
import { getUserProfileAction } from "@/store/actions/user";

export default function Settings() {

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleLogout = () => {
        dispatch(logoutAction()).then(() => {
            router.replace("/");
        });
    };

    const handleFetch = async () => {
        try {
            const result = await dispatch(getUserProfileAction());
            setUser(result.payload?.data);
        } catch (error: any) {
            toast.error(error?.message || "something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>

                    <div className="w-full flex items-center justify-start px-12 mt-8">
                        <div className="w-1/4 flex items-center justify-center">
                            <div className="w-32 relative rounded-full overflow-hidden">
                                <img src="/ui/empty-profile.webp" alt="" className="w-full" />
                                <div className="w-full h-[50%] flex items-center justify-center absolute bg-[rgba(0,0,0,0.2)] backdrop-blur bottom-0 left-0">
                                    <span className="font-base text-sm text-white">
                                        Add profile
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/4 flex flex-col gap-4">
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col items-start">
                                    <span className="text-xs font-medium">First name</span>
                                    <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                        {user?.firstName}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start">
                                    <span className="text-xs font-medium">Last name</span>
                                    <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                        {user?.lastName}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col items-start">
                                    <span className="text-xs font-medium">Username</span>
                                    <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                        {user?.username}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start">
                                    <span className="text-xs font-medium">Email</span>
                                    <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col items-start">
                                    <span className="text-xs font-medium">Role</span>
                                    <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                        {user?.role}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start">
                                    <span className="text-xs font-medium">Account Verified</span>
                                    <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                        {user?.isVerified ? "Yes" : "No"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-end px-12 mt-8 gap-4">
                        <button onClick={() => {}} className="bg-white shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Update profile</button>
                        <button onClick={handleLogout} className="bg-white shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Logout</button>
                    </div>
                </>
            )}
        </>
    )
}