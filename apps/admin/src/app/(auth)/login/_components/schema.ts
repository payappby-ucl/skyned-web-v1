import { CommonSchema, PROHIBITED_USER_EMAIL_DOMAINS } from "@workspace/shared";
import { z } from "@workspace/ui/lib/utils";

export const AdminLoginSchema = z.object({
  email: CommonSchema.shape.email.refine(
    (val) =>
      PROHIBITED_USER_EMAIL_DOMAINS.some((emailDomain) =>
        val.endsWith(emailDomain),
      ),
    "Please use organization email.",
  ),

  password: z.string().trim().min(8, "Password too short").nonempty("Required"),
});

export type AdminLoginSchema = z.infer<typeof AdminLoginSchema>;
