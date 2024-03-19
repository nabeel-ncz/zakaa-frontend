"use client";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthLayout(
    { children }: { children: React.ReactNode }
) {

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchUserAction()).then((res) => {
            if (res.payload?.success) {
                router.replace("/");
            }
        })
    }, []);

    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
                <div className="lg:w-1/2 xl:w-6/12 sm:p-6">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}