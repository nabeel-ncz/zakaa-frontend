"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { TypeDispatch } from "@/store";
import { verifyAccountAction } from "@/store/actions";
import { toast } from "react-toastify";

export default function EmailVerificationForm() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleSubmition = async () => {
        try {

            const result = await dispatch(verifyAccountAction({ otp }));
    
            if (!result?.payload) {
                throw new Error("OTP is incorrect, Try again!");
            }
    
            if (!result?.payload?.success) {
                throw new Error("OTP is incorrect, Try again!");
            }

            setError("");
            
            toast.success("Your account is verified");
    
            router.replace("/");
    
        } catch (error: any) {
            setError(error?.message);
        }
    }

    return (
        <>
            <div className="mx-auto max-w-sm my-auto">
                <h2 className="font-bold text-2xl">Email <span className="primary-text">verification </span> !</h2>
                <h2 className="font-light text-lg">Please check you email</h2>
                <div className="flex flex-col items-center mt-6">
                    <input onChange={(evt) => {
                        setOtp(evt.target.value)
                    }} value={otp} placeholder={`Enter the otp`} className="custom-form-input" type={`text`} />
                    {error && <p className="text-start custom-form-error">{error}</p>}
                </div>
                <p className="mt-6 text-sm text-gray-600 text-start">
                    Unable to receive OTP?,
                    <span className="font-medium text-blue-500">
                        Resent OTP
                    </span>
                </p>
                <button
                    onClick={handleSubmition}
                    className="custom-form-button primary-bg">
                    <span>
                        Continue
                    </span>
                </button>
            </div>
        </>
    )
}