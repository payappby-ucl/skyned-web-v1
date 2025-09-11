import { z } from "zod";
export declare const ApplyFormSchema: z.ZodObject<Pick<{
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
}, "email" | "gender" | "phoneNumber"> & {
    firstName: z.ZodString;
    lastName: z.ZodString;
    programId: z.ZodString;
    education: z.ZodEffects<z.ZodObject<{
        highestLevelOfEducation: z.ZodEnum<["Bachelor's Degree", "Secondary School Diploma", "Master's Degree", "Highest National Diploma", "Ordinary National Diploma", "Others"]>;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        highestLevelOfEducation: "Others" | "Bachelor's Degree" | "Secondary School Diploma" | "Master's Degree" | "Highest National Diploma" | "Ordinary National Diploma";
        value?: string | undefined;
    }, {
        highestLevelOfEducation: "Others" | "Bachelor's Degree" | "Secondary School Diploma" | "Master's Degree" | "Highest National Diploma" | "Ordinary National Diploma";
        value?: string | undefined;
    }>, {
        highestLevelOfEducation: "Others" | "Bachelor's Degree" | "Secondary School Diploma" | "Master's Degree" | "Highest National Diploma" | "Ordinary National Diploma";
        value?: string | undefined;
    }, {
        highestLevelOfEducation: "Others" | "Bachelor's Degree" | "Secondary School Diploma" | "Master's Degree" | "Highest National Diploma" | "Ordinary National Diploma";
        value?: string | undefined;
    }>;
    employment: z.ZodEffects<z.ZodObject<{
        employed: z.ZodBoolean;
        position: z.ZodOptional<z.ZodString>;
        yearsOfExperience: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        employed: boolean;
        yearsOfExperience: number;
        position?: string | undefined;
    }, {
        employed: boolean;
        yearsOfExperience: number;
        position?: string | undefined;
    }>, {
        employed: boolean;
        yearsOfExperience: number;
        position?: string | undefined;
    }, {
        employed: boolean;
        yearsOfExperience: number;
        position?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    gender: "Male" | "Female" | "Others";
    phoneNumber: string;
    education: {
        highestLevelOfEducation: "Others" | "Bachelor's Degree" | "Secondary School Diploma" | "Master's Degree" | "Highest National Diploma" | "Ordinary National Diploma";
        value?: string | undefined;
    };
    programId: string;
    employment: {
        employed: boolean;
        yearsOfExperience: number;
        position?: string | undefined;
    };
}, {
    firstName: string;
    lastName: string;
    email: string;
    gender: "Male" | "Female" | "Others";
    phoneNumber: string;
    education: {
        highestLevelOfEducation: "Others" | "Bachelor's Degree" | "Secondary School Diploma" | "Master's Degree" | "Highest National Diploma" | "Ordinary National Diploma";
        value?: string | undefined;
    };
    programId: string;
    employment: {
        employed: boolean;
        yearsOfExperience: number;
        position?: string | undefined;
    };
}>;
export type ApplyFormSchema = z.infer<typeof ApplyFormSchema>;
