import { z } from "zod";

export const CreateIntakeSchema = z.object({
  intake: z.coerce.number().positive().int(),
  startDate: z.coerce.number().positive().int(),
  deadline: z.coerce.number().positive().int(),
});

export type CreateIntakeSchema = z.infer<typeof CreateIntakeSchema>;
