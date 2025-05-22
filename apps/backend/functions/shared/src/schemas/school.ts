import z from "zod";
import slugify from "slugify";
import { CommonSchema } from "./common";
import { currencies, institutionType, ownershipType } from "../utils";

export const CreateSchoolSchema = CommonSchema.pick({
  country: true,
}).extend({
  logo: CommonSchema.shape.image,
  schoolImage: CommonSchema.shape.image,
  name: z.string().trim().nonempty("Required"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .nonempty("required")
    .transform((val) => slugify(val, { lower: true })),
  state: z.string().trim().nonempty("Required"),
  city: z.string().trim().nonempty("Required"),
  address: z.string().trim().nonempty("Required"),
  link: z.string().trim().url("Enter a valid url"),
  institutionType: z.enum([
    institutionType.college,
    institutionType.university,
  ]),
  ownershipType: z.enum([ownershipType.private, ownershipType.public]),
  currency: z.enum([
    currencies.AUD,
    currencies.CAD,
    currencies.EUR,
    currencies.GBP,
    currencies.NGN,
    currencies.USD,
  ]),
  overview: z.string().trim().nonempty("Required"),
});

export type CreateSchoolSchema = z.infer<typeof CreateSchoolSchema>;

export const UpdateSchoolSchema = CreateSchoolSchema.partial({
  logo: true,
  schoolImage: true,
});
export type UpdateSchoolSchema = z.infer<typeof UpdateSchoolSchema>;
