import { z } from "zod";
import parseDataURL from "data-urls";
import { CommonSchema } from "./common";
import { department, PROHIBITED_USER_EMAIL_DOMAINS } from "../utils";
import sanitizeHtml from "sanitize-html";

export const CreateAdminSchema = z.object({
  firstName: z.string().trim().nonempty("Required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty("Required"),
  email: CommonSchema.shape.email.refine(
    (val) =>
      PROHIBITED_USER_EMAIL_DOMAINS.some((emailDomain) =>
        val.endsWith(emailDomain),
      ),
    "Please use organization email.",
  ),
  gender: CommonSchema.shape.gender,
  nationality: CommonSchema.shape.country,
  countryOfResidence: CommonSchema.shape.country,
  jobTitle: z.string().trim().nonempty("Required"),
  about: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? sanitizeHtml(val) : val)),
  phoneNumber: CommonSchema.shape.phoneNumber.optional(),
  socials: z.array(CommonSchema.shape.social).optional(),
  primaryImage: CommonSchema.shape.image,
  secondaryImage: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => (val ? !!parseDataURL(val) : true),
      "Image must be of type data-url",
    ),
  departments: z
    .array(
      z.object({
        id: z.number().int().positive(),
        name: z.enum([
          department.Executive,
          department.Admissions,
          department.Communications,
          department.Human_Resource,
          department.Marketing,
          department.Quality_Assurance,
          department.Technical,
        ]),
      }),
    )
    .min(1, "Please select at least one department"),
});
export type CreateAdminSchema = z.infer<typeof CreateAdminSchema>;

export const UpdateAdminSchema = CreateAdminSchema.omit({
  primaryImage: true,
  departments: true,
}).extend({
  primaryImage: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => (val ? !!parseDataURL(val) : true),
      "Image must be of type data-url",
    ),
});
export type UpdateAdminSchema = z.infer<typeof UpdateAdminSchema>;
