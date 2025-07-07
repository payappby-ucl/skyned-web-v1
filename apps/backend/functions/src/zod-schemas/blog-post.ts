import { z } from "zod";
import { GeneralSchema } from "./general";

export const BlogPostParamsSchema = GeneralSchema.pick({
  slug: true,
});
export type BlogPostParamsSchema = z.infer<typeof BlogPostParamsSchema>;

export const BlogPostQuerySchema = z.object({
  c: z.string().trim().toLowerCase().optional(),
  p: z.boolean().optional(),
  f: z.boolean().optional(),
});
export type BlogPostQuerySchema = z.infer<typeof BlogPostQuerySchema>;
