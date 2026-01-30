import { ContactUsSchema } from "@workspace/shared";
import { GeneralSchema } from "../../../zod-schemas";
import { z } from "zod";

/** Schema for validating inquiry before saving to the database */
export const CreateContactUsSchema = ContactUsSchema.omit({
  phoneNumber: true,
}).merge(
  GeneralSchema.pick({
    phoneNumber: true,
  }),
);
export type CreateContactUsSchema = z.infer<typeof CreateContactUsSchema>;
