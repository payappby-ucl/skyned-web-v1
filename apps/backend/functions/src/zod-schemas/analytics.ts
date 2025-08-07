import { z } from "zod";

export const DateRangeSchema = z.object({
  from: z.coerce.number().optional(),
  to: z.coerce.number().optional(),
});
export type DateRangeSchema = z.infer<typeof DateRangeSchema>;
