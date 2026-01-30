import { z } from "zod";

export const tokenSchema = z.object({
  token: z.string().nonempty("Required"),
  type: z.enum(["verify", "reset"]),
  expiresIn: z.date(),
  tokenId: z.string().trim().nonempty("required"),
});
