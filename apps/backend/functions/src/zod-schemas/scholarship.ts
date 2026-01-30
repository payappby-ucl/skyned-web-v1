import { z } from "zod";
import { PageQuerySchema } from "./query";
import { scholarshipCategories } from "@workspace/shared";

export const ScholarshipQuerySchema = PageQuerySchema.extend({
  featured: z.enum(["true"]).optional(),
  category: z.enum(scholarshipCategories).optional(),
});
export type ScholarshipQuerySchema = z.infer<typeof ScholarshipQuerySchema>;
