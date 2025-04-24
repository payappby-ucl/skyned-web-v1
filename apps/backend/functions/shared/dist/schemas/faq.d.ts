import { z } from "zod";
export declare const CreateFaqSchema: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    question: string;
    answer: string;
}, {
    question: string;
    answer: string;
}>;
export type CreateFaqSchema = z.infer<typeof CreateFaqSchema>;
