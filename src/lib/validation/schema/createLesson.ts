import { z, ZodType } from "zod";
import { CreateLessonFormData } from "@/types";

export const CreateLessonSchema: ZodType<CreateLessonFormData> = z
    .object({
        lessonTitle: z.string().min(1, "Lesson title is required!"),
        lessonDescription: z.string().min(10, "Lesson description should contain at least 10 characters!"),
    });
