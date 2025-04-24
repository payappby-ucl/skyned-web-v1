import { z } from "zod";

export const PageQuerySchema = z.object({
  limit: z
    .number()
    .int()
    .positive()
    .min(1, "A minimum of 1")
    .max(100, "A maximum of 100")
    .optional(),

  page: z.number().int().positive().optional(),
});
export type PageQuerySchema = z.infer<typeof PageQuerySchema>;
