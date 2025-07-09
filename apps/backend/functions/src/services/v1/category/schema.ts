import { z } from "zod";
import { IdSchema } from "../../../zod-schemas";

export const DeleteCategoriesSchema = z.object({
  data: z.array(IdSchema).min(1, "At least one"),
});
export type DeleteCategoriesSchema = z.infer<typeof DeleteCategoriesSchema>;
