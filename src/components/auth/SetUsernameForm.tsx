"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeState } from "@/store";
import { findUsernameAction } from "@/store/actions/auth/findUsernameAction";
import { useRouter } from "next/navigation";
import { signupAction } from "@/store/actions";
import { SignupFormData } from "@/types";

export default function SetUsernameForm() {

    const dispatch: TypeDispatch = useDispatch();
    const signupData = useSelector((state: TypeState) => state.user.temp);
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!signupData) {
            router.replace('/signup');
        }
    }, [signupData]);

    const copyToInput = (value: string) => {
        setUsername(value)
    }

    const handleSubmition = async () => {
        try {

            const result = await dispatch(findUsernameAction(username));

            if (!result.payload.success) {
                throw new Error("Username is not available!");
            }

            setError("");

            const data = signupData ? signupData : {};

            await dispatch(signupAction({
                ...data,
                username
            } as SignupFormData));

            router.replace("/");

        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
                <div className="lg:w-1/2 xl:w-6/12 sm:p-12">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="mx-auto max-w-sm my-auto">
                                <h2 className="font-bold text-2xl">Choose your <span className="primary-text">username </span> !</h2>
                                <h2 className="font-light text-lg">We'll suggest available options for you.</h2>
                                <div className="flex flex-col items-center mt-6">
                                    <input
                                        value={username}
                                        placeholder={`username`}
                                        className={`custom-form-input ${error && "border-red-800 focus:border-red-800"}`}
                                        type={`text`}
                                    />
                                    {error && <p className="custom-form-error">{error}</p>}
                                </div>
                                <div className="py-4 flex flex-col items-start justify-center gap-2 text-blue-900">
                                    <h2 onClick={() => { copyToInput("user342") }} className="font-medium text-sm cursor-pointer hover:text-blue-950">- user342</h2>
                                </div>
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
        </>
    )
}