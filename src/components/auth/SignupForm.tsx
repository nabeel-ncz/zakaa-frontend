'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/lib/validation/schema";
import FormField from "@/components/ui/FormField";
import { TypeDispatch } from "@/store";
import { tempSignupData } from "@/store/slices";
import { useDispatch } from "react-redux";
import { SignupFormData } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { findEmailAction } from "@/store/actions/auth/findEmailAction";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function SignupForm() {

    const dispatch: TypeDispatch = useDispatch();
    const [emailError, setEmailError] = useState<{ email: { message: string; } } | null>(null);
    const router: AppRouterInstance = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        dispatch(tempSignupData(data));

        try {

            const result: any = await dispatch(findEmailAction(data.email));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            setEmailError(null);

            router.push('/auth/set-username');

        } catch (error: any) {
            console.log(error);
            setEmailError({
                email: {
                    message: `${error.message ||
                        "Something went wrong, Try again!"
                        }`
                }
            });
        }

    }

    const handleGoogleSignup = () => {
        signIn('google', { callbackUrl: `${window.location.origin}/` });
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <button
                    onClick={handleGoogleSignup}
                    className="w-full max-w-sm font-bold shadow-sm rounded-lg py-3 bg-purple-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <img src="../icons/google.png" alt="" />
                    <span className="ml-4">
                        Sign Up with Google
                    </span>
                </button>
            </div>

            <div className="mt-2 mb-8 border-b text-center">
                <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium transform translate-y-1/2">
                    OR
                </div>
            </div>
            <div className="mx-auto max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} >

                    <FormField
                        fieldName="firstName"
                        fieldType="text"
                        placeHolder="First Name"
                        register={register}
                        errors={errors}
                    />

                    <FormField
                        fieldName="lastName"
                        fieldType="text"
                        placeHolder="Last Name"
                        register={register}
                        errors={errors}
                    />

                    <FormField
                        fieldName="email"
                        fieldType="email"
                        placeHolder="Email"
                        register={register}
                        errors={emailError || errors}
                    />

                    <FormField
                        fieldName="password"
                        fieldType="password"
                        placeHolder="password"
                        register={register}
                        errors={errors}
                    />

                    <FormField
                        fieldName="confirmPassword"
                        fieldType="password"
                        placeHolder="Confirm Password"
                        register={register}
                        errors={errors}
                    />

                    <button
                        type="submit"
                        className="custom-form-button primary-bg">
                        <span className="ml-3">
                            Sign Up
                        </span>
                    </button>

                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Already have an account,
                        <Link href={"/auth/login"}>
                            <span className="font-medium text-blue-500">
                                Login now ?
                            </span>
                        </Link>
                    </p>

                </form>

                <p className="mt-6 text-xs text-gray-600 text-center">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                    <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                    </a>
                    <span> and </span>
                    <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                    </a>
                    Please review them before proceeding.
                </p>
            </div>
        </>
    )
}