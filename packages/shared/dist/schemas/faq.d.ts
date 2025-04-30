import { z } from "zod";
export declare const CreateFaqSchema: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    question: string;
    answer: string;
}, {
    question: string;
    answer: string;
}>;
export type CreateFaqSchema = z.infer<typeof CreateFaqSchema>;
