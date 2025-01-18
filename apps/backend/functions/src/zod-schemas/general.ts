import { z } from "zod";

export const generalSchema = z.object({});
export type GeneralSchema = z.infer<typeof generalSchema>;
