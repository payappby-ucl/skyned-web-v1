import { z } from "@workspace/ui/lib/utils";

export const HeroSearchSchema = z.object({
  course: z.string().trim().optional(),
  country: z.string().trim().optional(),
});
export type HeroSearchSchema = z.infer<typeof HeroSearchSchema>;
