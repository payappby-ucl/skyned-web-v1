import sanitizeHtml from "sanitize-html";
import { z } from "zod";

export const CreateAccommodationSchema = z.object({
  description: z
    .string()
    .trim()
    .nonempty("Required")
    .transform((val) => sanitizeHtml(val)),
});
export type CreateAccommodationSchema = z.infer<
  typeof CreateAccommodationSchema
>;
