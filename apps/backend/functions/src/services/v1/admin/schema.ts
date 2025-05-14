import { CreateAdminSchema } from "@workspace/shared";
import { z } from "zod";
import { GeneralSchema } from "../../../zod-schemas";

export const CreateAdminServiceSchema = CreateAdminSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  middleName: true,
  gender: true,
  nationality: true,
  countryOfResidence: true,
  about: true,
  jobTitle: true,
  socials: true,
}).extend({
  adminId: z.string().trim().nonempty("Required"),
  createdById: z.string().trim().nonempty("Required"),
  phoneNumber: GeneralSchema.shape.phoneNumber,
  primaryImage: GeneralSchema.shape.object,
  secondaryImage: GeneralSchema.shape.object.optional(),
  departments: z
    .array(z.number().int().positive())
    .min(1, "A minimum of one department"),
});

export type CreateAdminServiceSchema = z.infer<typeof CreateAdminServiceSchema>;

export const UpdateAdminServiceSchema = CreateAdminServiceSchema.partial({
  primaryImage: true,
  departments: true,
}).omit({
  createdById: true,
  departments: true,
});

export type UpdateAdminServiceSchema = z.infer<typeof UpdateAdminServiceSchema>;
