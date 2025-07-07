import { ProgramSchema, UpdateBulkProgramSchema } from "@workspace/shared";
import { z } from "zod";

export const CreateProgramServiceSchema = z.object({
  data: ProgramSchema,
  adminId: z.string().trim().nonempty("Required"),
  schoolId: z.string().trim().nonempty("Required"),
});
export type CreateProgramServiceSchema = z.infer<
  typeof CreateProgramServiceSchema
>;

export const CreateProgramsServiceSchema = z.object({
  data: z.array(ProgramSchema),
  adminId: z.string().trim().nonempty("Required"),
  schoolId: z.string().trim().nonempty("Required"),
});
export type CreateProgramsServiceSchema = z.infer<
  typeof CreateProgramsServiceSchema
>;

export const UpdateProgramServiceSchema = z.object({
  data: ProgramSchema.partial(),
  slug: z.string().trim().nonempty("Required"),
  programId: z.string().trim().nonempty("Required"),
  schoolId: z.string().trim().nonempty("Required"),
});
export type UpdateProgramServiceSchema = z.infer<
  typeof UpdateProgramServiceSchema
>;

export const UpdateProgramsServiceSchema = UpdateBulkProgramSchema.pick({
  data: true,
}).extend({
  schoolId: z.string().trim().nonempty("Required"),
});

export type UpdateProgramsServiceSchema = z.infer<
  typeof UpdateProgramsServiceSchema
>;

export const intakeOperationSchema = z.object({
  schoolId: z.string().trim().nonempty("Required"),
  slug: z.string().trim().nonempty("Required"),
  intakes: z
    .array(z.number().positive().int())
    .min(1, "Must select at least one"),
});
export type intakeOperationSchema = z.infer<typeof intakeOperationSchema>;
