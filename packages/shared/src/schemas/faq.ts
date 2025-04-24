import { z } from "zod";

export const CreateFaqSchema = z.object({
  question: z.string().trim().nonempty("Required"),
  answer: z.string().trim().nonempty("Required"),
});
export type CreateFaqSchema = z.infer<typeof CreateFaqSchema>;
