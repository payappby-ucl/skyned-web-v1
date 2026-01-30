import { z } from "@workspace/ui/lib/utils";

export const NewsLetterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase()
    .nonempty("Required"),
});
export type NewsLetterFormSchema = z.infer<typeof NewsLetterFormSchema>;
