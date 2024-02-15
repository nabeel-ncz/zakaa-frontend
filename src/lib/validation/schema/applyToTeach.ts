import { z, ZodType } from "zod";
import { ApplyToTeachFormData } from "@/types";

export const ApplyToTeachSchema: ZodType<ApplyToTeachFormData> = z
    .object({
        profession: z.string().min(1, "Profession is required"),
        phone: z.string().min(1, "Phone number is required"),
        profileDescription: z.string().min(10, "Profile description atleast contain 10 characters"),
        linkedIn: z.string(),
        github: z.string()
    })

