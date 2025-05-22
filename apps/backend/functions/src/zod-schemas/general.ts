import { z } from "zod";

export const GeneralSchema = z.object({
  phoneNumber: z.object({
    number: z.string().trim().nonempty("Required"),
    countryCallingCode: z.string().trim().nonempty("Required"),
    nationalNumber: z.string().trim().nonempty("Required"),
    country: z.string().trim().optional(),
  }),

  id: z.coerce.number().int("Must be an integer").positive("Must be positive"),

  adminId: z.string().nonempty("Required"),
  schoolId: z.string().nonempty("Required"),
  slug: z.string().nonempty("Required"),

  object: z.object({
    path: z.string().trim().nonempty("Required"),
    mimeType: z.string().trim().nonempty("Required"),
    url: z.string().url("Enter a valid url").nonempty("Required"),
  }),
});
export type GeneralSchema = z.infer<typeof GeneralSchema>;
