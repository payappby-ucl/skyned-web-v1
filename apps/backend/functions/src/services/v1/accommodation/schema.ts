import { CreateAccommodationSchema } from "@workspace/shared";
import { z } from "zod";
import { GeneralSchema } from "../../../zod-schemas";

export const CreateAccommodationServiceSchema =
  CreateAccommodationSchema.extend({
    adminId: z.string().trim().nonempty("Required"),
    schoolId: z.string().trim().nonempty("Required"),
  });
export type CreateAccommodationServiceSchema = z.infer<
  typeof CreateAccommodationServiceSchema
>;

export const DeleteAccommodationSchema = GeneralSchema.pick({
  id: true,
});
export type DeleteAccommodationSchema = z.infer<
  typeof DeleteAccommodationSchema
>;
