import { z, ZodType } from "zod";
import { LoginFormData } from "@/types";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

export const LoginSchema: ZodType<LoginFormData> = z
    .object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1, "Password is required")
            .refine((value) => passwordRegex.test(value), {
                message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            })
    });