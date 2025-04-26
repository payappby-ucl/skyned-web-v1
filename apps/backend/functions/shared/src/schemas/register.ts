import { z } from "zod";
import { CommonSchema } from "./common";

/** Schema for user registration */
export const RegisterSchema = CommonSchema.pick({
  email: true,
});

/** Schema type */
export type RegisterSchema = z.infer<typeof RegisterSchema>;

/** Schema for user account creation */
export const AccountCreationSchema = CommonSchema.pick({
  email: true,
}).extend({
  password: z.coerce.string().trim().min(8, "A minimum of 8 characters"),
});

/** Schema type */
export type AccountCreationSchema = z.infer<typeof AccountCreationSchema>;
