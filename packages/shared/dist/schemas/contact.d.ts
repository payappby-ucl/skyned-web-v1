import { z } from "zod";
export declare const ContactUsSchema: z.ZodObject<z.objectUtil.extendShape<Pick<{
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
}, "phoneNumber">, {
    email: z.ZodEffects<z.ZodString, string, string>;
    message: z.ZodString;
    name: z.ZodString;
    subject: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    email: string;
    phoneNumber: string;
    message: string;
    name: string;
    subject: string;
}, {
    email: string;
    phoneNumber: string;
    message: string;
    name: string;
    subject: string;
}>;
export type ContactUsSchema = z.infer<typeof ContactUsSchema>;
