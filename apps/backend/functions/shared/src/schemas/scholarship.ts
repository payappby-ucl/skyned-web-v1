import { z } from "zod";
import slugify from "slugify";
import sanitizeHtml from "sanitize-html";
import { CommonSchema } from "./common";
import { scholarshipCategories } from "../utils";

export const CreateScholarshipSchema = z.object({
  title: z.string().trim().nonempty("Required"),
  subtitle: z.string().trim().nonempty("Required"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .nonempty("required")
    .transform((val) => slugify(val, { lower: true, strict: true })),
  banner: CommonSchema.shape.image,
  overview: z.string().nonempty("Required"),
  description: z
    .string()
    .trim()
    .nonempty("Required")
    .transform((val) => (val ? sanitizeHtml(val) : val)),
  featured: z.boolean().default(false),
  category: z.enum(scholarshipCategories),
  eligibilityRequirements: z
    .array(z.string().trim().nonempty("Required"))
    .min(1, "Please add at least one eligibility requirement"),
});
export type CreateScholarshipSchema = z.infer<typeof CreateScholarshipSchema>;
