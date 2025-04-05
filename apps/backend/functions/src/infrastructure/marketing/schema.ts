import { z } from "zod";

export const AddContactToAudienceInputSchema = z.object({
  contactId: z.union([
    z.string().trim().nonempty("Required"),
    z.number().int().positive().min(1, "Minimum of 1"),
  ]),
  audienceId: z.union([
    z.string().trim().nonempty("Required"),
    z.number().int().positive().min(1, "Minimum of 1"),
  ]),
});
export type AddContactToAudienceInputSchema = z.infer<
  typeof AddContactToAudienceInputSchema
>;
