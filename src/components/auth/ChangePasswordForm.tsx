"use client";
import { TypeDispatch } from "@/store";
import { changePasswordAction } from "@/store/actions/auth/changePasswordAction";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function ChangePasswordForm() {

    const router: AppRouterInstance = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [error, setError] = useState<string>("");
    const [nPassword, setNPassword] = useState<string>("");
    const [cPassword, setCPassword] = useState<string>("");
    const searchParams: ReadonlyURLSearchParams = useSearchParams();

    const handleSubmition = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(nPassword)) {
            return setError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }
        if (nPassword !== cPassword) {
            return setError("Confirm password do not match!");
        }
        try {

            const response: any = await dispatch(changePasswordAction({
                token: searchParams.get("token") || "",
                password: nPassword
            }));

            if (response?.error && response?.error?.message) {
                throw new Error(response?.error?.message);
            }

            if (!response.payload || !response.payload.success) {
                throw new Error("There is something went wrong!");
            }

            setError("");
            toast.success("Password changed successfully, Please login!", {
                position: "bottom-right"
            });
            router.replace("/auth/login");

        } catch (error: any) {
            setError(error.message || "Something went wrong!");
        }
    }

    return (
        <div className="mx-auto max-w-sm my-auto">
            <h2 className="font-bold text-2xl">Change your <span className="primary-text">password </span> ?</h2>
            <h2 className="font-light text-lg">Don't worry we're here to help!!</h2>
            <div className="flex flex-col items-center mt-6 gap-4">
                <input value={nPassword} onChange={(e) => {
                    setNPassword(e.target.value)
                }} placeholder={`New password`} className="custom-form-input" type={`password`} />
                <input value={cPassword} onChange={(e) => {
                    setCPassword(e.target.value)
                }} placeholder={`Confirm password`} className="custom-form-input" type={`password`} />
            </div>
            {error && <p className="text-start custom-form-error">{error}</p>}
            <button
                onClick={handleSubmition}
                className="custom-form-button primary-bg">
                <span>
                    Continue
                </span>
            </button>
        </div>
    )
}
