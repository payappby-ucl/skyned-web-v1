import { z } from "zod";

export const PageQuerySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "A minimum of 1")
    .max(100, "A maximum of 100")
    .optional(),
  page: z.coerce.number().int().positive().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
});
export type PageQuerySchema = z.infer<typeof PageQuerySchema>;
