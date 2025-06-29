import { z } from "zod";
export declare const ComputeEnglishProficiencySchema: z.ZodEffects<z.ZodObject<{
    examType: z.ZodEnum<["ielts", "toefl", "duolingo", "pte", "open"]>;
    score: z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        reading: z.ZodNumber;
        listening: z.ZodNumber;
        speaking: z.ZodNumber;
        writing: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    }, {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    }>]>;
}, "strip", z.ZodTypeAny, {
    examType: "ielts" | "toefl" | "pte" | "duolingo" | "open";
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
}, {
    examType: "ielts" | "toefl" | "pte" | "duolingo" | "open";
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
}>, {
    examType: "ielts" | "toefl" | "pte" | "duolingo" | "open";
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
}, {
    examType: "ielts" | "toefl" | "pte" | "duolingo" | "open";
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
}>;
export type ComputeEnglishProficiencySchema = z.infer<typeof ComputeEnglishProficiencySchema>;
