import { CreateFaqSchema } from "@workspace/shared";
import { z } from "zod";

export const CreateDbFaqSchema = CreateFaqSchema.extend({
  createdById: z.string().trim().nonempty("Required"),
});
export type CreateDbFaqSchema = z.infer<typeof CreateDbFaqSchema>;
