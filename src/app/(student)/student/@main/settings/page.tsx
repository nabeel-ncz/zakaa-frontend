"use client";
import { TypeDispatch } from "@/store";
import { logoutAction } from "@/store/actions/auth/logoutAction";
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation";

export default function Settings() {

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutAction()).then(() => {
            router.replace("/");
        });
    };

    return (
        <div className="p-10">
            <button onClick={() => {
                router.push("/auth/reset-password");
            }} className="mr-2 bg-white shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Reset Password</button>
            <button onClick={handleLogout} className="bg-white shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Logout</button>
        </div>
    )
}