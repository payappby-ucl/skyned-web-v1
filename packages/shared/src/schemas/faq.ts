import { z } from "zod";
import sanitizeHtml from "sanitize-html";

export const CreateFaqSchema = z.object({
  question: z.coerce.string().trim().nonempty("Required"),
  answer: z.coerce
    .string()
    .trim()
    .nonempty("Required")
    .transform((val) => sanitizeHtml(val)),
});
export type CreateFaqSchema = z.infer<typeof CreateFaqSchema>;
