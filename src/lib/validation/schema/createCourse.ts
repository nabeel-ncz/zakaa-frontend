import { z, ZodType } from "zod";
import { CreateCourseFormData } from "@/types";

export const CreateCourseSchema: ZodType<CreateCourseFormData> = z
    .object({
        courseTitle: z.string().min(1, "Course title is required!"),
        courseCategory: z.string().min(1, "Course category is required!"),
        courseDescription: z.string().min(10, "Course description should contain at least 10 characters!"),
        numberOfLessons: z.string().refine(
            (data) => Number(data) && Number(data) >= 1,
            "Atleas 1 lesson should be required!"
        )
    });


