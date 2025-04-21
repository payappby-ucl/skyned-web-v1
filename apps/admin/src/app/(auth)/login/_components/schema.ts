import { z } from "@workspace/ui/lib/utils";

export const AdminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .toLowerCase()
    .nonempty("Required")
    .refine(
      (val) => val.endsWith("@skynedconsults.com"),
      "Please use your work email",
    ),

  password: z.string().trim().min(8, "Password too short").nonempty("Required"),
});

export type AdminLoginSchema = z.infer<typeof AdminLoginSchema>;
