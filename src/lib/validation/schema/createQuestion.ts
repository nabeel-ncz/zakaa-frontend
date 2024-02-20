import { CreateQuestionFormData } from "@/types";
import { ZodType, z } from "zod";

export const CreateQuestionSchema: ZodType<CreateQuestionFormData> = z
    .object({
        question: z.string().min(1, "Question is required!"),
        option_1: z.string().min(1, "Option 1 is required!"),
        option_2: z.string().min(1, "Option 2 is required!"),
        option_3: z.string().min(1, "Option 3 is required!"),
        option_4: z.string().min(1, "Option 4 is required!"),
        answer: z.string().min(1, "Answer is required!"),
    });
