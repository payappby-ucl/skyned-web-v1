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
