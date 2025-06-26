import { ProgramSchema } from "@workspace/shared";
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
