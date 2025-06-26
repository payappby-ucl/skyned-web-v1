import { z } from "zod";
export declare const CreateAdminSchema: z.ZodObject<{
    firstName: z.ZodString;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    gender: z.ZodEnum<["Male", "Female", "Others"]>;
    nationality: z.ZodEffects<z.ZodString, string, string>;
    countryOfResidence: z.ZodEffects<z.ZodString, string, string>;
    jobTitle: z.ZodString;
    about: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    socials: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodEnum<["facebook", "instagram", "linkedin", "pinterest", "tiktok", "x"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }>, "many">>;
    primaryImage: z.ZodEffects<z.ZodString, string, string>;
    secondaryImage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    departments: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodEnum<["Executive", "Admissions", "Communications", "Human_Resource", "Marketing", "Quality_Assurance", "Technical"]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: "Executive" | "Marketing" | "Admissions" | "Communications" | "Technical" | "Human_Resource" | "Quality_Assurance";
    }, {
        id: number;
        name: "Executive" | "Marketing" | "Admissions" | "Communications" | "Technical" | "Human_Resource" | "Quality_Assurance";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    primaryImage: string;
    nationality: string;
    gender: "Male" | "Female" | "Others";
    countryOfResidence: string;
    departments: {
        id: number;
        name: "Executive" | "Marketing" | "Admissions" | "Communications" | "Technical" | "Human_Resource" | "Quality_Assurance";
    }[];
    middleName?: string | undefined;
    about?: string | undefined;
    secondaryImage?: string | undefined;
    phoneNumber?: string | undefined;
    socials?: {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }[] | undefined;
}, {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    primaryImage: string;
    nationality: string;
    gender: "Male" | "Female" | "Others";
    countryOfResidence: string;
    departments: {
        id: number;
        name: "Executive" | "Marketing" | "Admissions" | "Communications" | "Technical" | "Human_Resource" | "Quality_Assurance";
    }[];
    middleName?: string | undefined;
    about?: string | undefined;
    secondaryImage?: string | undefined;
    phoneNumber?: string | undefined;
    socials?: {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }[] | undefined;
}>;
export type CreateAdminSchema = z.infer<typeof CreateAdminSchema>;
export declare const UpdateAdminSchema: z.ZodObject<Omit<{
    firstName: z.ZodString;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    gender: z.ZodEnum<["Male", "Female", "Others"]>;
    nationality: z.ZodEffects<z.ZodString, string, string>;
    countryOfResidence: z.ZodEffects<z.ZodString, string, string>;
    jobTitle: z.ZodString;
    about: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    phoneNumber: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    socials: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodEnum<["facebook", "instagram", "linkedin", "pinterest", "tiktok", "x"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }, {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }>, "many">>;
    primaryImage: z.ZodEffects<z.ZodString, string, string>;
    secondaryImage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    departments: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodEnum<["Executive", "Admissions", "Communications", "Human_Resource", "Marketing", "Quality_Assurance", "Technical"]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: "Executive" | "Marketing" | "Admissions" | "Communications" | "Technical" | "Human_Resource" | "Quality_Assurance";
    }, {
        id: number;
        name: "Executive" | "Marketing" | "Admissions" | "Communications" | "Technical" | "Human_Resource" | "Quality_Assurance";
    }>, "many">;
}, "primaryImage" | "departments"> & {
    primaryImage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    nationality: string;
    gender: "Male" | "Female" | "Others";
    countryOfResidence: string;
    middleName?: string | undefined;
    primaryImage?: string | undefined;
    about?: string | undefined;
    secondaryImage?: string | undefined;
    phoneNumber?: string | undefined;
    socials?: {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }[] | undefined;
}, {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    nationality: string;
    gender: "Male" | "Female" | "Others";
    countryOfResidence: string;
    middleName?: string | undefined;
    primaryImage?: string | undefined;
    about?: string | undefined;
    secondaryImage?: string | undefined;
    phoneNumber?: string | undefined;
    socials?: {
        name: "facebook" | "instagram" | "linkedin" | "x" | "tiktok" | "pinterest";
        url: string;
    }[] | undefined;
}>;
export type UpdateAdminSchema = z.infer<typeof UpdateAdminSchema>;
