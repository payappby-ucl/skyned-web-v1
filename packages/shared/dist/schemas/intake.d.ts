import { z } from "zod";
export declare const CreateIntakeSchema: z.ZodObject<{
    intake: z.ZodEffects<z.ZodString, string, string>;
    startDate: z.ZodNumber;
    deadline: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    intake: string;
    startDate: number;
    deadline: number;
}, {
    intake: string;
    startDate: number;
    deadline: number;
}>;
export type CreateIntakeSchema = z.infer<typeof CreateIntakeSchema>;
