import { z } from "zod";

/** Schema for user registration */
export const RegisterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .nonempty("Required"),
});

/** Schema type */
export type RegisterSchema = z.infer<typeof RegisterSchema>;
