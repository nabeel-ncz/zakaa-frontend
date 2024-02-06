'use client';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/lib/validation/schema";
import FormField from "@/components/ui/FormField";
import { TypeDispatch } from "@/store";
import { signupAction } from "@/store/actions"
import { useDispatch } from "react-redux";
import { SignupFormData } from "@/types";

export default function SignupForm() {

    const dispatch: TypeDispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = (data: SignupFormData) => {
        dispatch(signupAction(data));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-normal">

            <label> First Name: </label>
            <FormField
                fieldName="firstName"
                fieldType="text"
                register={register}
                errors={errors}
            />

            <label> Last Name: </label>
            <FormField
                fieldName="lastName"
                fieldType="text"
                register={register}
                errors={errors}
            />

            <label> Email: </label>
            <FormField
                fieldName="email"
                fieldType="email"
                register={register}
                errors={errors}
            />

            <label> Password: </label>
            <FormField
                fieldName="password"
                fieldType="password"
                register={register}
                errors={errors}
            />

            <label> Confirm Password: </label>
            <FormField
                fieldName="confirmPassword"
                fieldType="password"
                register={register}
                errors={errors}
            />

            <button type="submit" className="border bg-slate-100">Submit</button>
        </form>
    )
}