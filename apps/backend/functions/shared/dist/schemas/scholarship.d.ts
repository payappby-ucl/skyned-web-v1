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
