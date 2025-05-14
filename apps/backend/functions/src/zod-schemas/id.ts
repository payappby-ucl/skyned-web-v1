import { z } from "zod";
import { GeneralSchema } from "./general";

export const IdSchema = GeneralSchema.pick({
  id: true,
});

export type IdSchema = z.infer<typeof IdSchema>;

export const AdminIdSchema = GeneralSchema.pick({
  adminId: true,
});

export type AdminIdSchema = z.infer<typeof AdminIdSchema>;
