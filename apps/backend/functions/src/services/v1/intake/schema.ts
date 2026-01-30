import { CreateIntakeSchema } from "@workspace/shared";
import { z } from "zod";

export const CreateIntakeServiceSchema = z.object({
  data: CreateIntakeSchema,
  adminId: z.string().trim().nonempty("Required"),
  schoolId: z.string().trim().nonempty("Required"),
});
export type CreateIntakeServiceSchema = z.infer<
  typeof CreateIntakeServiceSchema
>;

export const CreateManyIntakeServiceSchema = z.object({
  data: z.array(CreateIntakeSchema),
  adminId: z.string().trim().nonempty("Required"),
  schoolId: z.string().trim().nonempty("Required"),
});
export type CreateManyIntakeServiceSchema = z.infer<
  typeof CreateManyIntakeServiceSchema
>;

export const DeleteIntakeServiceSchema = z.object({
  data: z.array(z.coerce.number().positive().int()).min(1, "Minimum of one"),
});
export type DeleteIntakeServiceSchema = z.infer<
  typeof DeleteIntakeServiceSchema
>;
