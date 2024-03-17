'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/validation/schema";
import { TypeDispatch } from "@/store";
import { loginAction } from "@/store/actions"
import { useDispatch } from "react-redux";
import { LoginFormData } from "@/types";
import FormField from "@/components/ui/FormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function LoginForm() {

    const [error, setError] = useState<string | null>(null);
    const dispatch: TypeDispatch = useDispatch();
    const router: AppRouterInstance = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {

            const result: any = await dispatch(loginAction(data))

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result?.payload) {
                throw new Error("Login failed, Try again!");
            }

            if (!result?.payload?.success) {
                throw new Error("Login failed, Try again!");
            }

            setError(null);

            router.replace("/");

        } catch (error: any) {
            setError(error?.message || "Something wrong, Try again!");
        }
    }

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: `${window.location.origin}/` });
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full max-w-sm font-bold shadow-sm rounded-lg py-3 bg-purple-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <img src="../icons/google.png" alt="" />
                    <span className="ml-4">
                        Sign In with Google
                    </span>
                </button>
            </div>

            <div className="mt-2 mb-8 border-b text-center">
                <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium transform translate-y-1/2">
                    OR
                </div>
            </div>

            <div className="mx-auto max-w-sm my-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {error && <p className="text-start custom-form-error mb-2">{error}</p>}

                    <FormField
                        fieldName="email"
                        fieldType="email"
                        placeHolder="Email"
                        register={register}
                        errors={errors}
                    />

                    <FormField
                        fieldName="password"
                        fieldType="password"
                        placeHolder="Password"
                        register={register}
                        errors={errors}
                    />

                    <p className="mt-2 text-sm text-gray-600 text-start">
                        <Link href={"/auth/forgot-password"}>
                            <span className="font-medium text-blue-500">
                                Forgot password ?
                            </span>
                        </Link>
                    </p>


                    <button
                        type="submit"
                        className="custom-form-button primary-bg">
                        <span className="ml-3">
                            Log In
                        </span>
                    </button>

                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Don't have an account,
                        <Link href={"/auth/signup"}>
                            <span className="font-medium text-blue-500">
                                Signup now ?
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
}