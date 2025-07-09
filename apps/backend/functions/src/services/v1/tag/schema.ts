import { z } from "zod";
import { IdSchema } from "../../../zod-schemas";

export const DeleteTagsSchema = z.object({
  data: z.array(IdSchema).min(1, "At least one"),
});
export type DeleteTagsSchema = z.infer<typeof DeleteTagsSchema>;
