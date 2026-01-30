import { CommonSchema } from "@workspace/shared";
import { z } from "zod";

export const emailTemplateSchema = z.object({
  from: CommonSchema.pick({ email: true }).extend({
    name: z.string().trim().optional(),
  }),
  to: z.array(z.string().trim()).min(1, "At least one email address is needed"),
  subject: z.string().trim().nonempty("Subject is required"),
  html: z.string().trim().nonempty("Subject is required"),
  attachments: z
    .array(
      z.object({
        filename: z.string().nonempty("Required"),
        content: z.string().nonempty("Required"),
        contentType: z.enum(["text/plain"]),
        encoding: z.enum(["base64"]),
      }),
    )
    .optional(),
});
