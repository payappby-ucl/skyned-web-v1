import { Country } from "country-state-city";
import { isValidPhoneNumber } from "libphonenumber-js";
import parseDataURL from "data-urls";
import { gender, socialMedia } from "../utils";
import { z } from "zod";

/** Common schema use in multiple places */
export const CommonSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .nonempty("Required"),

  phoneNumber: z
    .string()
    .trim()
    .nonempty("Enter a valid phone number")
    .superRefine((val, ctx) => {
      if (!isValidPhoneNumber(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid phone number",
        });
      }
    }),

  gender: z.enum([gender.Male, gender.Female, gender.Others]),
  country: z
    .string()
    .trim()
    .refine(
      (val) => !!Country.getCountryByCode(val),
      "Please enter a valid option",
    ),
  social: z.object({
    name: z.enum([
      socialMedia.facebook,
      socialMedia.instagram,
      socialMedia.linkedin,
      socialMedia.pinterest,
      socialMedia.tiktok,
      socialMedia.x,
    ]),
    url: z
      .string()
      .trim()
      .url("Enter a valid profile link")
      .nonempty("Required"),
  }),

  image: z
    .string()
    .trim()
    .refine((val) => !!parseDataURL(val), "Image must be of type data-url"),
});

/** Schema type */
export type CommonSchema = z.infer<typeof CommonSchema>;
