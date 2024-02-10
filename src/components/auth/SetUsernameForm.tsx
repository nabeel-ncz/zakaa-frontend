"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TypeState } from "@/store";
import { useRouter } from "next/navigation";
import { useAxiosGet } from "@/hooks";
import { signupSubmitionService } from "@/services";

export default function SetUsernameForm() {

    const { data }: any = useAxiosGet("/api/auth/available/username");
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

    const handleSubmition = () => {
        return signupSubmitionService(username, (message: string) => {
            setError(message);
        });
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
                                        onChange={(evt) => { setUsername(evt.target.value) }}
                                        placeholder={`username`}
                                        className={`custom-form-input ${error && "border-red-800 focus:border-red-800"}`}
                                        type={`text`}
                                    />
                                    {error && <p className="text-start custom-form-error">{error}</p>}
                                </div>
                                <div className="py-4 flex flex-col items-start justify-center gap-2 text-blue-900">
                                    {data?.success && data.data?.map((item: string) => (
                                        <h2 onClick={() => { copyToInput(`${item}`) }} className="font-medium text-sm cursor-pointer hover:text-blue-950">- {item}</h2>
                                    ))}
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