import { z } from "zod";
export declare const PageQuerySchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    page?: number | undefined;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export type PageQuerySchema = z.infer<typeof PageQuerySchema>;
