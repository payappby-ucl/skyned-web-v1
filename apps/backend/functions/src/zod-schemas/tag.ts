import { z } from "zod";
import { IdSchema } from "./id";

export const TagQuerySchema = IdSchema.extend({
  name: z.string().trim().toLowerCase().optional(),
});
export type TagQuerySchema = z.infer<typeof TagQuerySchema>;
