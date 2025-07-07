import slugify from "slugify";
import { degreeTypes, timeframe, tuitionFeeType } from "../utils";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

export const ProgramSchema = z.object({
  name: z.string().trim().nonempty("Required"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .nonempty("required")
    .transform((val) => slugify(val, { lower: true, strict: true })),
  faculty: z.string().trim().nonempty("Required"),
  degreeType: z.enum(degreeTypes),
  overview: z.string().trim().nonempty("Required"),
  description: z
    .string()
    .trim()
    .nonempty("Required")
    .transform((val) => (val ? sanitizeHtml(val) : val)),

  requirements: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? sanitizeHtml(val) : val)),

  applicationFee: z.coerce.number().min(0, "Minimum of 0"),

  applicationFeeDiscount: z.coerce
    .number()
    .min(0, "Minimum of 0")
    .max(100, "Maximum of 100"),

  tuitionFee: z.coerce.number().min(0, "Minimum of 0"),
  tuitionFeeType: z.enum(tuitionFeeType),

  timeframe: z.enum(timeframe),
  duration: z.coerce.number().min(1, "Minimum of 0"),

  minimumEducationLevel: z.enum([
    "primary",
    "secondary",
    "undergraduate",
    "postgraduate",
  ]),
  minimumEducationDegree: z.coerce
    .number()
    .positive("Must be positive")
    .int("Must be an integer")
    .min(1, "Minimum of 1")
    .max(21, "Maximum of 21"),
  minimumEligibilityGpa: z.coerce
    .number()
    .min(1, "Minimum of 1")
    .max(100, "Maximum of 100"),

  proficiencies: z.array(
    z.object({
      test: z.enum(["ielts", "toefl", "duolingo", "pte"]),
      score: z.coerce.number().min(0),
    }),
  ),

  pgwp: z.boolean().default(false),

  intakes: z
    .array(z.number().positive().int())
    .min(1, "Program must have at least one intake"),
});

export type ProgramSchema = z.infer<typeof ProgramSchema>;

export const CreateProgramSchema = z
  .object({
    type: z.enum(["single", "bulk"]),
    data: ProgramSchema.or(
      z.array(ProgramSchema).min(1, "Must have at least one program."),
    ),
  })
  .superRefine(({ type, data }, ctx) => {
    if (type === "bulk" && !Array.isArray(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bulk upload needs a list of data",
        path: ["data"],
      });
    }
  });
export type CreateProgramSchema = z.infer<typeof CreateProgramSchema>;

export const UpdateBulkProgramSchema = z.object({
  data: z.array(
    z.object({
      programId: z.string().trim().nonempty("Required"),
      data: ProgramSchema.partial(),
    }),
  ),
});
export type UpdateBulkProgramSchema = z.infer<typeof UpdateBulkProgramSchema>;
