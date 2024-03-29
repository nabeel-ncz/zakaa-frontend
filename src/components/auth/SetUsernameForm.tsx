"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeState } from "@/store";
import { useRouter } from "next/navigation";
import { IUseAxiosGetOnClick, useAxiosGetOnClick } from "@/hooks";
import { findUsernameAction, signupAction } from "@/store/actions";
import { SignupFormData } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export default function SetUsernameForm() {

    const { fetchData, data }: IUseAxiosGetOnClick = useAxiosGetOnClick();
    const dispatch: TypeDispatch = useDispatch();
    const signupData: SignupFormData | any = useSelector((state: TypeState) => state.user.temp);
    const router: AppRouterInstance = useRouter();

    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!signupData) {
            router.replace('/signup');
        }
        if (signupData) {
            fetchData(`/api/auth/available/username?f=${signupData?.firstName}&l=${signupData.lastName}`);
        }
    }, [signupData]);

    const copyToInput = (value: string) => {
        setUsername(value)
    }

    const handleSubmition = async () => {

        try {

            const result: any = await dispatch(findUsernameAction(username));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result?.payload?.success) {
                throw new Error("Username is not available!");
            }

            const data = signupData ? signupData : {};

            const response: any = await dispatch(signupAction({
                ...data,
                username
            } as SignupFormData));

            if (response?.error && response?.error?.message) {
                throw new Error(response?.error?.message);
            }

            setError('');

            router.replace("/auth/verify");

        } catch (error: any) {
            setError(error?.message);
        }
    }

    return (
        <>
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
        </>
    )
}