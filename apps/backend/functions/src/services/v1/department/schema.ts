import { z } from "zod";

export const DepartmentIdsSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1, "Ids cannot be empty"),
});
export type DepartmentIdsSchema = z.infer<typeof DepartmentIdsSchema>;
