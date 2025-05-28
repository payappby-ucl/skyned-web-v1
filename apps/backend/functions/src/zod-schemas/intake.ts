import { z } from "zod";

export const IntakeQuery = z.object({
  status: z.enum(["active"]).optional(),
});
export type IntakeQuery = z.infer<typeof IntakeQuery>;
