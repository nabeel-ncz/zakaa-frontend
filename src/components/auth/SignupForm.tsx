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

export default function SignupForm() {

    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = (data: SignupFormData) => {
        dispatch(tempSignupData(data));
        router.push('/set-username');
    }

    return (
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
                errors={errors}
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
                <Link href={"/login"}>
                    <span className="font-medium text-blue-500">
                        Login now ?
                    </span>
                </Link>
            </p>

        </form>
    )
}