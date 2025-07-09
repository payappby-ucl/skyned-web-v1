import { z } from "zod";
import { CommonSchema } from "./common";
import { blogPostStatus } from "../utils";
import parseDataURL from "data-urls";

export const BlogSchema = z.object({
  title: z.string().trim().nonempty("Required"),
  slug: CommonSchema.shape.slug,
  coverImage: CommonSchema.shape.image,
  excerpt: z.string().trim().nonempty("Required"),
  content: CommonSchema.shape.html,

  featured: z.boolean().default(false),
  status: z.enum(blogPostStatus),
  publishedAt: z.coerce.number().positive().int().optional(),

  categories: z
    .array(z.string().trim().toLowerCase())
    .min(1, "At least on category is required"),

  tags: z
    .array(z.string().trim().toLowerCase())
    .min(1, "At least one tag is required."),
});

export const BlogPostSchema = BlogSchema.superRefine((args, ctx) => {
  if (args.status === "scheduled" && !args.publishedAt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please schedule a date for post to be published",
      path: ["publishedAt"],
    });
  }
});
export type BlogPostSchema = z.infer<typeof BlogPostSchema>;

export const UpdateBlogPostSchema = BlogSchema.omit({
  coverImage: true,
})
  .partial()
  .extend({
    coverImage: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => (val ? !!parseDataURL(val) : true),
        "Image must be of type data-url",
      ),
  });
export type UpdateBlogPostSchema = z.infer<typeof UpdateBlogPostSchema>;
