import { z } from "zod";
export declare const ContactUsSchema: z.ZodObject<z.objectUtil.extendShape<Pick<{
    email: z.ZodString;
    phoneNumber: z.ZodEffects<z.ZodString, string, string>;
}, "email" | "phoneNumber">, {
    message: z.ZodString;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    email: string;
    phoneNumber: string;
    message: string;
    name: string;
}, {
    email: string;
    phoneNumber: string;
    message: string;
    name: string;
}>;
export type ContactUsSchema = z.infer<typeof ContactUsSchema>;
