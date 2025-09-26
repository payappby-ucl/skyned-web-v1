import { z } from "zod";
export declare const CreateScholarshipSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    banner: z.ZodEffects<z.ZodString, string, string>;
    overview: z.ZodString;
    description: z.ZodEffects<z.ZodString, string, string>;
    featured: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodEnum<["accommodation", "tuition", "application fees", "others"]>;
    eligibilityRequirements: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    slug: string;
    overview: string;
    description: string;
    title: string;
    featured: boolean;
    subtitle: string;
    banner: string;
    category: "accommodation" | "tuition" | "application fees" | "others";
    eligibilityRequirements: string[];
}, {
    slug: string;
    overview: string;
    description: string;
    title: string;
    subtitle: string;
    banner: string;
    category: "accommodation" | "tuition" | "application fees" | "others";
    eligibilityRequirements: string[];
    featured?: boolean | undefined;
}>;
export type CreateScholarshipSchema = z.infer<typeof CreateScholarshipSchema>;
export declare const UpdateScholarshipSchema: z.ZodObject<Omit<{
    title: z.ZodString;
    subtitle: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    banner: z.ZodEffects<z.ZodString, string, string>;
    overview: z.ZodString;
    description: z.ZodEffects<z.ZodString, string, string>;
    featured: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodEnum<["accommodation", "tuition", "application fees", "others"]>;
    eligibilityRequirements: z.ZodArray<z.ZodString, "many">;
}, "banner"> & {
    banner: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    overview: string;
    description: string;
    title: string;
    featured: boolean;
    subtitle: string;
    category: "accommodation" | "tuition" | "application fees" | "others";
    eligibilityRequirements: string[];
    banner?: string | undefined;
}, {
    slug: string;
    overview: string;
    description: string;
    title: string;
    subtitle: string;
    category: "accommodation" | "tuition" | "application fees" | "others";
    eligibilityRequirements: string[];
    featured?: boolean | undefined;
    banner?: string | undefined;
}>;
export type UpdateScholarshipSchema = z.infer<typeof UpdateScholarshipSchema>;
