import z from "zod";

/** Common schema use in multiple places */
export const CommonSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .nonempty("Required"),
});

/** Schema type */
export type CommonSchema = z.infer<typeof CommonSchema>;
