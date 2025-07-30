import { CreateSchoolSchema } from "@workspace/shared";
import { GeneralSchema } from "../../../zod-schemas";
import { z } from "zod";

export const CreateSchoolServiceSchema = CreateSchoolSchema.omit({
  logo: true,
  schoolImage: true,
}).extend({
  logo: GeneralSchema.shape.object,
  schoolImage: GeneralSchema.shape.object,
  schoolId: GeneralSchema.shape.schoolId,
});

export type CreateSchoolServiceSchema = z.infer<
  typeof CreateSchoolServiceSchema
>;

export const UpdateSchoolServiceSchema = CreateSchoolSchema.omit({
  logo: true,
  schoolImage: true,
}).extend({
  logo: GeneralSchema.shape.object,
  schoolImage: GeneralSchema.shape.object,
  schoolId: GeneralSchema.shape.schoolId,
  active: z.boolean().optional(),
});

export type UpdateSchoolServiceSchema = z.infer<
  typeof UpdateSchoolServiceSchema
>;
