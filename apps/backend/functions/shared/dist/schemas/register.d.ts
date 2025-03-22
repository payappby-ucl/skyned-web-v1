import { z } from "zod";
/** Schema for user registration */
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
/** Schema type */
export type RegisterSchema = z.infer<typeof RegisterSchema>;
