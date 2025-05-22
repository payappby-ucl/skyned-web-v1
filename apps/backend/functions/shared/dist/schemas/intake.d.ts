import { z } from "zod";
export declare const CreateIntakeSchema: z.ZodObject<{
    intake: z.ZodNumber;
    startDate: z.ZodNumber;
    deadline: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    intake: number;
    startDate: number;
    deadline: number;
}, {
    intake: number;
    startDate: number;
    deadline: number;
}>;
export type CreateIntakeSchema = z.infer<typeof CreateIntakeSchema>;
