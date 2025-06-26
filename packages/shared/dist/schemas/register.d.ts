import { z } from "zod";
/** Schema for user registration */
export declare const RegisterSchema: z.ZodObject<Pick<{
    email: z.ZodString;
    phoneNumber: z.ZodEffects<z.ZodString, string, string>;
    gender: z.ZodEnum<["Male", "Female", "Others"]>;
    country: z.ZodEffects<z.ZodString, string, string>;
    social: z.ZodObject<{
        name: z.ZodEnum<["facebook", "instagram", "linkedin", "pinterest", "tiktok", "x"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }>;
    image: z.ZodEffects<z.ZodString, string, string>;
}, "email">, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
/** Schema type */
export type RegisterSchema = z.infer<typeof RegisterSchema>;
/** Schema for user account creation */
export declare const AccountCreationSchema: z.ZodObject<Pick<{
    email: z.ZodString;
    phoneNumber: z.ZodEffects<z.ZodString, string, string>;
    gender: z.ZodEnum<["Male", "Female", "Others"]>;
    country: z.ZodEffects<z.ZodString, string, string>;
    social: z.ZodObject<{
        name: z.ZodEnum<["facebook", "instagram", "linkedin", "pinterest", "tiktok", "x"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }>;
    image: z.ZodEffects<z.ZodString, string, string>;
}, "email"> & {
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
/** Schema type */
export type AccountCreationSchema = z.infer<typeof AccountCreationSchema>;
