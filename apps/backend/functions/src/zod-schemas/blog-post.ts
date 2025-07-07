import { z } from "zod";
import { GeneralSchema } from "./general";
import { blogPostStatus } from "@workspace/shared";

export const BlogPostParamsSchema = GeneralSchema.pick({
  slug: true,
});
export type BlogPostParamsSchema = z.infer<typeof BlogPostParamsSchema>;

export const BlogPostQuerySchema = z.object({
  c: z.string().trim().toLowerCase().optional(),
  s: z.enum(blogPostStatus).optional(),
  f: z.boolean().optional(),
});
export type BlogPostQuerySchema = z.infer<typeof BlogPostQuerySchema>;
