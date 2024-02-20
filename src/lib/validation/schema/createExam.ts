import { CreateExamFormData } from "@/types";
import { ZodType, z } from "zod";

export const CreateExamSchema: ZodType<CreateExamFormData> = z
    .object({
        title: z.string().min(1, "Title is required!"),
        lessonId: z.string().min(1, "Lesson is required!"),
        totalNoOfQuestions: z.string().refine(
            (data) => Number(data) && Number(data) >= 1,
            "Atleas 1 question should be required!"
        ),
        scoreForEachQuestion: z.string().refine(
            (data) => Number(data) && Number(data) >= 1,
            "Atleas 1 Mark should be required!"
        ),
        passMark: z.string().refine(
            (data) => Number(data) && Number(data) >= 1,
            "Pass Mark should be valid!"
        ),
    });
