import { z } from "zod";

export const adminSchema = z.object({
  adminId: z.string().trim().nonempty("Required"),
});
