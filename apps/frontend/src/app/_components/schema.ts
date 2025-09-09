import { z } from "@workspace/ui/lib/utils";

export const HeroSearchSchema = z
  .object({
    country: z.string().trim().optional(),
    course: z.string().trim().optional(),
  })
  .partial();
export type HeroSearchSchema = z.infer<typeof HeroSearchSchema>;
