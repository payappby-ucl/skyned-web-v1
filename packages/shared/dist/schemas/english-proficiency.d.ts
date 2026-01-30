import { z } from "zod";
export declare const ComputeEnglishProficiencySchema: z.ZodEffects<z.ZodObject<{
    examType: z.ZodEnum<["ielts", "toefl", "duolingo", "pte"]>;
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
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
    examType: "ielts" | "toefl" | "pte" | "duolingo";
}, {
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
    examType: "ielts" | "toefl" | "pte" | "duolingo";
}>, {
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
    examType: "ielts" | "toefl" | "pte" | "duolingo";
}, {
    score: number | {
        reading: number;
        listening: number;
        speaking: number;
        writing: number;
    };
    examType: "ielts" | "toefl" | "pte" | "duolingo";
}>;
export type ComputeEnglishProficiencySchema = z.infer<typeof ComputeEnglishProficiencySchema>;
export declare const EnglishProficiencySchema: z.ZodEffects<z.ZodObject<{
    test: z.ZodEnum<["ielts", "toefl", "duolingo", "pte"]>;
    score: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    test: "ielts" | "toefl" | "pte" | "duolingo";
    score: number;
}, {
    test: "ielts" | "toefl" | "pte" | "duolingo";
    score: number;
}>, {
    test: "ielts" | "toefl" | "pte" | "duolingo";
    score: number;
}, {
    test: "ielts" | "toefl" | "pte" | "duolingo";
    score: number;
}>;
export type EnglishProficiencySchema = z.infer<typeof EnglishProficiencySchema>;
