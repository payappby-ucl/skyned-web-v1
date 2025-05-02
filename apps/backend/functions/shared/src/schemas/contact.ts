import { z } from "zod";
import { CommonSchema } from "./common";
import { PROHIBITED_USER_EMAIL_DOMAINS } from "../utils";

export const ContactUsSchema = CommonSchema.pick({
  phoneNumber: true,
}).extend({
  email: CommonSchema.shape.email.refine(
    (val) =>
      !PROHIBITED_USER_EMAIL_DOMAINS.some((emailDomain) =>
        val.endsWith(emailDomain),
      ),
    "This email is not accepted.",
  ),
  message: z.string().trim().nonempty("Required"),
  name: z.string().trim().nonempty("Required"),
  subject: z.string().trim().nonempty("Required"),
});
export type ContactUsSchema = z.infer<typeof ContactUsSchema>;
