import { z, ZodType } from "zod";
import { UpdateCourseFormData } from "@/types";

export const UpdateCourseSchema: ZodType<UpdateCourseFormData> = z
    .object({
        courseTitle: z.string().min(1, "Course title is required!"),
        courseDescription: z.string().min(10, "Course description should contain at least 10 characters!"),
    });


