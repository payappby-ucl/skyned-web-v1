import { CommonSchema } from "@workspace/shared";
import { z } from "@workspace/ui/lib/utils";

export const HeroSearchSchema = CommonSchema.pick({ country: true })
  .partial()
  .extend({
    course: z.string().trim().optional(),
  });
export type HeroSearchSchema = z.infer<typeof HeroSearchSchema>;
