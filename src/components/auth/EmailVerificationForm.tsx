"use client"
import { useState } from "react";
import { emailVerificationService } from "@/services";

export default function EmailVerificationForm() {

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleSubmition = () => {
        return emailVerificationService(otp, (message: string) => {
            setError(message);
        });
    }

    return (
        <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
            <div className="lg:w-1/2 xl:w-6/12 sm:p-12">
                <div className="flex flex-col items-center">
                    <div className="w-full flex-1">
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
                    </div>
                </div>
            </div>
        </div>
    )
}