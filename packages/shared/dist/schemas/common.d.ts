import z from "zod";
/** Common schema use in multiple places */
export declare const CommonSchema: z.ZodObject<{
    email: z.ZodString;
    phoneNumber: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email: string;
    phoneNumber: string;
}, {
    email: string;
    phoneNumber: string;
}>;
/** Schema type */
export type CommonSchema = z.infer<typeof CommonSchema>;
