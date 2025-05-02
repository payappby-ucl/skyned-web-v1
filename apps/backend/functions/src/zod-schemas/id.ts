import { z } from "zod";
import { GeneralSchema } from "./general";

export const IdSchema = GeneralSchema.pick({
  id: true,
});

export type IdSchema = z.infer<typeof IdSchema>;
