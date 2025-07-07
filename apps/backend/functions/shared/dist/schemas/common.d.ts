import { z } from "zod";
/** Common schema use in multiple places */
export declare const CommonSchema: z.ZodObject<{
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
    slug: z.ZodEffects<z.ZodString, string, string>;
    html: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email: string;
    gender: "Male" | "Female" | "Others";
    phoneNumber: string;
    country: string;
    social: {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    };
    image: string;
    slug: string;
    html: string;
}, {
    email: string;
    gender: "Male" | "Female" | "Others";
    phoneNumber: string;
    country: string;
    social: {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    };
    image: string;
    slug: string;
    html: string;
}>;
/** Schema type */
export type CommonSchema = z.infer<typeof CommonSchema>;
