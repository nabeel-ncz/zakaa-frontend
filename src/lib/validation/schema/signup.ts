import { z, ZodType } from "zod";
import { SignupFormData } from "@/types";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignupSchema: ZodType<SignupFormData> = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required")
            .refine((value) => passwordRegex.test(value), {
                message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            }),
        confirmPassword: z.string().min(1, "Confirm Password is required")
    })
    .refine((data: any) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
