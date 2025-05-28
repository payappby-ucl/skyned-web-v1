import { z } from "zod";

export const CreateIntakeSchema = z.object({
  intake: z
    .string()
    .nonempty("Required")
    .refine(
      (val) =>
        !!val.match(
          /\b(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s\d{4}\b/g,
        ),
      "Enter a valid intake",
    ),
  startDate: z.coerce.number().positive().int(),
  deadline: z.coerce.number().positive().int(),
});

export type CreateIntakeSchema = z.infer<typeof CreateIntakeSchema>;
