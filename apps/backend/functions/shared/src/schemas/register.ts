import { z } from "zod";
import { CommonSchema } from "./common";

/** Schema for user registration */
export const RegisterSchema = CommonSchema.pick({
  email: true,
});

/** Schema type */
export type RegisterSchema = z.infer<typeof RegisterSchema>;
