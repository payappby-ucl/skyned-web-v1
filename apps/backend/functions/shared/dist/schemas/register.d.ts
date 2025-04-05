import { z } from "zod";
/** Schema for user registration */
export declare const RegisterSchema: z.ZodObject<Pick<{
    email: z.ZodString;
}, "email">, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
/** Schema type */
export type RegisterSchema = z.infer<typeof RegisterSchema>;
