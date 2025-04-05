import z from "zod";
/** Common schema use in multiple places */
export declare const CommonSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
/** Schema type */
export type CommonSchema = z.infer<typeof CommonSchema>;
