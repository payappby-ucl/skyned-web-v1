import { z } from "zod";

export const CreateFaqSchema = z.object({
  question: z.coerce.string().trim().nonempty("Required"),
  answer: z.coerce.string().trim().nonempty("Required"),
});
export type CreateFaqSchema = z.infer<typeof CreateFaqSchema>;
