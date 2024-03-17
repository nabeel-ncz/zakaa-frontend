"use client";
import { TypeDispatch } from "@/store";
import { sendForgotPasswordMailAction } from "@/store/actions/auth/sendForgotPasswordMailAction";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function ForgotPasswordForm() {

    const router: AppRouterInstance = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleForgotPasswordSubmition = async () => {
        try {
            const response: any = await dispatch(sendForgotPasswordMailAction({ email }));

            if (response?.error && response?.error?.message) {
                throw new Error(response?.error?.message);
            }

            if(!response.payload || !response.payload.success){
                throw new Error("There is something went wrong!");
            }

            setError(null);
            toast.success("Reset password mail sent successfully!", {
                position: "bottom-right"
            });
            router.push("/");

        } catch (error: any) {
            setError(error?.message || "Something went wrong, Try again!");
        }
    }

    return (
        <div className="mx-auto max-w-sm my-auto">
            <h2 className="font-bold text-2xl">Forgot your <span className="primary-text">password </span> ?</h2>
            <h2 className="font-light text-lg">Don't worry we're here to help!!</h2>
            <div className="flex flex-col items-center mt-6">
                <input value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} placeholder={`Email`} className="custom-form-input" type={`email`} />
            </div>
            {error && <p className="text-start custom-form-error">{error}</p>}
            <button
                onClick={handleForgotPasswordSubmition}
                className="custom-form-button primary-bg">
                <span>
                    Continue
                </span>
            </button>
        </div>
    )
}
