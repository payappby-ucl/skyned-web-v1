import { z } from "zod";
export declare const CreateAccommodationSchema: z.ZodObject<{
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
}, {
    description: string;
}>;
export type CreateAccommodationSchema = z.infer<typeof CreateAccommodationSchema>;
