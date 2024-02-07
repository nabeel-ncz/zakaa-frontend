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

export default function LoginForm() {

    const dispatch: TypeDispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        dispatch(loginAction(data));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

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
                <Link href={"/forgot-password"}>
                    <span className="font-medium text-blue-500">
                        Forgot password ?
                    </span>
                </Link>
            </p>
            

            <button
                type="submit"
                className="custom-form-button">
                <span className="ml-3">
                    Log In
                </span>
            </button>

            <p className="mt-6 text-sm text-gray-600 text-center">
                Not a member,
                <Link href={"/signup"}>
                    <span className="font-medium text-blue-500">
                        Signup now ?
                    </span>
                </Link>
            </p>
        </form>
    )
}