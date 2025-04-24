import { z } from "zod";

export const GeneralSchema = z.object({
  phoneNumber: z.object({
    number: z.string().trim().nonempty("Required"),
    countryCallingCode: z.string().trim().nonempty("Required"),
    nationalNumber: z.string().trim().nonempty("Required"),
    country: z.string().trim().optional(),
  }),

  id: z.number().int().positive(),
});
export type GeneralSchema = z.infer<typeof GeneralSchema>;
