import { CreateFaqSchema } from "@workspace/shared";
import { z } from "zod";
import { IdSchema } from "../../../zod-schemas";

export const CreateDbFaqSchema = CreateFaqSchema.extend({
  createdById: z.string().trim().nonempty("Required"),
});
export type CreateDbFaqSchema = z.infer<typeof CreateDbFaqSchema>;

export const UpdateDbFaqSchema = CreateFaqSchema.merge(IdSchema);
export type UpdateDbFaqSchema = z.infer<typeof UpdateDbFaqSchema>;
