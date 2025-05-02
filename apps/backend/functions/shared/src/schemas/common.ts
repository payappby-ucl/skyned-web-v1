import { isValidPhoneNumber } from "libphonenumber-js";
import z from "zod";

/** Common schema use in multiple places */
export const CommonSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .nonempty("Required"),

  phoneNumber: z
    .string()
    .trim()
    .nonempty("Enter a valid phone number")
    .superRefine((val, ctx) => {
      if (!isValidPhoneNumber(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid phone number",
        });
      }
    }),
});

/** Schema type */
export type CommonSchema = z.infer<typeof CommonSchema>;
