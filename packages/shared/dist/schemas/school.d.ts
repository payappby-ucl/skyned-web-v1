import z from "zod";
export declare const CreateSchoolSchema: z.ZodObject<z.objectUtil.extendShape<Pick<{
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
}, "country">, {
    logo: z.ZodEffects<z.ZodString, string, string>;
    schoolImage: z.ZodEffects<z.ZodString, string, string>;
    name: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    state: z.ZodString;
    city: z.ZodString;
    address: z.ZodString;
    link: z.ZodString;
    institutionType: z.ZodEnum<["college", "university"]>;
    ownershipType: z.ZodEnum<["private", "public"]>;
    currency: z.ZodEnum<["AUD", "CAD", "EUR", "GBP", "NGN", "USD"]>;
    overview: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    country: string;
    name: string;
    logo: string;
    schoolImage: string;
    slug: string;
    state: string;
    city: string;
    address: string;
    link: string;
    institutionType: "university" | "college";
    ownershipType: "private" | "public";
    currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
    overview: string;
}, {
    country: string;
    name: string;
    logo: string;
    schoolImage: string;
    slug: string;
    state: string;
    city: string;
    address: string;
    link: string;
    institutionType: "university" | "college";
    ownershipType: "private" | "public";
    currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
    overview: string;
}>;
export type CreateSchoolSchema = z.infer<typeof CreateSchoolSchema>;
export declare const UpdateSchoolSchema: z.ZodObject<{
    country: z.ZodEffects<z.ZodString, string, string>;
    name: z.ZodString;
    logo: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    schoolImage: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    slug: z.ZodEffects<z.ZodString, string, string>;
    state: z.ZodString;
    city: z.ZodString;
    address: z.ZodString;
    link: z.ZodString;
    institutionType: z.ZodEnum<["college", "university"]>;
    ownershipType: z.ZodEnum<["private", "public"]>;
    currency: z.ZodEnum<["AUD", "CAD", "EUR", "GBP", "NGN", "USD"]>;
    overview: z.ZodString;
}, "strip", z.ZodTypeAny, {
    country: string;
    name: string;
    slug: string;
    state: string;
    city: string;
    address: string;
    link: string;
    institutionType: "university" | "college";
    ownershipType: "private" | "public";
    currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
    overview: string;
    logo?: string | undefined;
    schoolImage?: string | undefined;
}, {
    country: string;
    name: string;
    slug: string;
    state: string;
    city: string;
    address: string;
    link: string;
    institutionType: "university" | "college";
    ownershipType: "private" | "public";
    currency: "USD" | "CAD" | "AUD" | "NGN" | "EUR" | "GBP";
    overview: string;
    logo?: string | undefined;
    schoolImage?: string | undefined;
}>;
export type UpdateSchoolSchema = z.infer<typeof UpdateSchoolSchema>;
