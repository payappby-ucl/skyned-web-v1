import { z } from "zod";
import { IdSchema } from "./id";

export const CategoryQuerySchema = IdSchema.extend({
  name: z.string().trim().toLowerCase().optional(),
});
export type CategoryQuerySchema = z.infer<typeof CategoryQuerySchema>;
