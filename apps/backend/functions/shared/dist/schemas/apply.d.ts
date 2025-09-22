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
    program: z.ZodObject<{
        slug: z.ZodString;
        schoolSlug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        schoolSlug: string;
    }, {
        slug: string;
        schoolSlug: string;
    }>;
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
        employed: z.ZodEnum<["Yes", "No"]>;
        job: z.ZodOptional<z.ZodString>;
        yearsOfExperience: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        employed: "Yes" | "No";
        job?: string | undefined;
        yearsOfExperience?: number | undefined;
    }, {
        employed: "Yes" | "No";
        job?: string | undefined;
        yearsOfExperience?: number | undefined;
    }>, {
        employed: "Yes" | "No";
        job?: string | undefined;
        yearsOfExperience?: number | undefined;
    }, {
        employed: "Yes" | "No";
        job?: string | undefined;
        yearsOfExperience?: number | undefined;
    }>;
    countryOfInterest: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    budget: z.ZodEffects<z.ZodObject<{
        hasBudget: z.ZodEnum<["Yes", "No"]>;
        budget: z.ZodOptional<z.ZodObject<{
            currency: z.ZodEnum<["AUD", "CAD", "EUR", "GBP", "NGN", "USD"]>;
            amount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        }, {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        hasBudget: "Yes" | "No";
        budget?: {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        } | undefined;
    }, {
        hasBudget: "Yes" | "No";
        budget?: {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        } | undefined;
    }>, {
        hasBudget: "Yes" | "No";
        budget?: {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        } | undefined;
    }, {
        hasBudget: "Yes" | "No";
        budget?: {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        } | undefined;
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
    program: {
        slug: string;
        schoolSlug: string;
    };
    employment: {
        employed: "Yes" | "No";
        job?: string | undefined;
        yearsOfExperience?: number | undefined;
    };
    budget: {
        hasBudget: "Yes" | "No";
        budget?: {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        } | undefined;
    };
    countryOfInterest?: string[] | undefined;
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
    program: {
        slug: string;
        schoolSlug: string;
    };
    employment: {
        employed: "Yes" | "No";
        job?: string | undefined;
        yearsOfExperience?: number | undefined;
    };
    budget: {
        hasBudget: "Yes" | "No";
        budget?: {
            currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
            amount?: number | undefined;
        } | undefined;
    };
    countryOfInterest?: string[] | undefined;
}>;
export type ApplyFormSchema = z.infer<typeof ApplyFormSchema>;
