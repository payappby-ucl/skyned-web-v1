import { blogPostStatus, CommonSchema } from "@workspace/shared";
import { z } from "zod";
import { GeneralSchema } from "../../../zod-schemas";

export const CreateBlogPostSchema = z.object({
  title: z.string().trim().nonempty("Required"),
  slug: CommonSchema.shape.slug,
  excerpt: z.string().trim().nonempty("Required"),
  content: CommonSchema.shape.html,

  featured: z.boolean().default(false),
  status: z.enum(blogPostStatus),
  publishedAt: z.date().optional(),

  categories: z
    .array(z.string().trim().toLowerCase())
    .min(1, "At least on category is required"),

  tags: z
    .array(z.string().trim().toLowerCase())
    .min(1, "At least one tag is required."),

  coverImage: GeneralSchema.shape.object,
  authorId: z.string().trim().nonempty("Required"),
  blogPostId: z.string().trim().nonempty("Required"),
});
export type CreateBlogPostSchema = z.infer<typeof CreateBlogPostSchema>;
