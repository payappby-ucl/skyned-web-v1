import { z } from "zod";
export declare const CreateIntakeSchema: z.ZodObject<{
    intake: z.ZodEffects<z.ZodString, string, string>;
    startDate: z.ZodOptional<z.ZodNumber>;
    deadline: z.ZodOptional<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["open", "closed", "likely_open"]>>;
}, "strip", z.ZodTypeAny, {
    status: "open" | "closed" | "likely_open";
    intake: string;
    startDate?: number | undefined;
    deadline?: number | undefined;
}, {
    intake: string;
    status?: "open" | "closed" | "likely_open" | undefined;
    startDate?: number | undefined;
    deadline?: number | undefined;
}>;
export type CreateIntakeSchema = z.infer<typeof CreateIntakeSchema>;
