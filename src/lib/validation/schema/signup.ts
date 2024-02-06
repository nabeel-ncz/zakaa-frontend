import { z, ZodType } from "zod";
import { SignupFormData } from "@/types";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

export const SignupSchema: ZodType<SignupFormData> = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string()
    })
    .refine((value: any) => value.length >= 2, {
        message: "first name must contain at least 2 characters",
        path: ["firstName"],
    })
    .refine((value: any) => value.length >= 2, {
        message: "last name must contain at least 2 characters",
        path: ["lastName"],
    })
    .refine((value: any) => value.length >= 6, {
        message: "password must contain at least 6 characters",
        path: ["password"],
    }).refine((password: any) => passwordRegex.test(password), {
        message: "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character",
        path: ["password"],
    })
    .refine((value: any) => value.length >= 6, {
        message: "confirm password must contain at least 6 characters",
        path: ["confirmPassword"],
    })
    .refine((data: any) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
