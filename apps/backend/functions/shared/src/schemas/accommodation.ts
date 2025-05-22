import { z } from "zod";

export const CreateAccommodationSchema = z.object({
  description: z.string().trim().nonempty("Required"),
});
export type CreateAccommodationSchema = z.infer<
  typeof CreateAccommodationSchema
>;
