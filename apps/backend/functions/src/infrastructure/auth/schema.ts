import { AccountCreationSchema, CommonSchema } from "@workspace/shared";
import { z } from "zod";
import { AdminIdSchema } from "../../zod-schemas";

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

export const AuthUpdateSchema = AuthCreationSchema.pick({
  email: true,
  password: true,
})
  .extend({
    adminId: AdminIdSchema.shape.adminId,
  })
  .partial({
    email: true,
    password: true,
  });
export type AuthUpdateSchema = z.infer<typeof AuthUpdateSchema>;

export const TokenVerifySchema = z.object({
  token: z.string().trim().nonempty("Required"),
});
export type TokenVerifySchema = z.infer<typeof TokenVerifySchema>;
