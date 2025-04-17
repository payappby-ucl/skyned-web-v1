import { AccountCreationSchema, CommonSchema } from "@workspace/shared";
import { z } from "zod";

export const AuthCreationSchema = CommonSchema.pick({
  email: true,
})
  .merge(
    AccountCreationSchema.pick({
      password: true,
    }),
  )
  .extend({
    claim: z.enum(["admin", "student"]),
  });
export type AuthCreationSchema = z.infer<typeof AuthCreationSchema>;
