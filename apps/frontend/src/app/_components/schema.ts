import { CommonSchema } from "@workspace/shared";
import { z } from "@workspace/ui/lib/utils";

export const HeroSearchSchema = z.object({
  course: z.string().trim().optional(),
  country: CommonSchema.shape.country.optional(),
});
export type HeroSearchSchema = z.infer<typeof HeroSearchSchema>;
