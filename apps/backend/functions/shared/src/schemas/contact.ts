import { z } from "zod";
import { CommonSchema } from "./common";

export const ContactUsSchema = CommonSchema.pick({
  email: true,
  phoneNumber: true,
}).extend({
  message: z.string().trim().nonempty("Required"),
  name: z.string().trim().nonempty("Required"),
  subject: z.string().trim().nonempty("Required"),
});
export type ContactUsSchema = z.infer<typeof ContactUsSchema>;
