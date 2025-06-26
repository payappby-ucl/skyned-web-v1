import { z } from "zod";
export declare const ContactUsSchema: z.ZodObject<Pick<{
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
}, "phoneNumber"> & {
    email: z.ZodEffects<z.ZodString, string, string>;
    message: z.ZodString;
    name: z.ZodString;
    subject: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    phoneNumber: string;
    name: string;
    message: string;
    subject: string;
}, {
    email: string;
    phoneNumber: string;
    name: string;
    message: string;
    subject: string;
}>;
export type ContactUsSchema = z.infer<typeof ContactUsSchema>;
