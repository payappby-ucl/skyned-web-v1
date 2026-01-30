import { z } from "zod";
import sanitizeHtml from "sanitize-html";

export const CreateFaqSchema = z.object({
  question: z.string().trim().nonempty("Required"),
  answer: z
    .string()
    .trim()
    .nonempty("Required")
    .transform((val) => sanitizeHtml(val)),
});
export type CreateFaqSchema = z.infer<typeof CreateFaqSchema>;
