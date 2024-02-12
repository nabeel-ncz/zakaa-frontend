"use client";
import { TypeDispatch } from "@/store";
import { sendForgotPasswordMailAction } from "@/store/actions/auth/sendForgotPasswordMailAction";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleForgotPasswordSubmition = () => {
        dispatch(sendForgotPasswordMailAction({ email }))
            .then(() => {
                setError(null);
                toast.success("Reset password mail sent successfully!", {
                    position: "bottom-right"
                });
                router.push("/");
            }).catch((error: any) => {
                setError(error?.message || "Something went wrong, Try again!");
            });
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
