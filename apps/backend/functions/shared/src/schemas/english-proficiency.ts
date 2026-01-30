import { EnglishProficiency } from "../utils";
import { z } from "zod";

export const ComputeEnglishProficiencySchema = z
  .object({
    examType: z.enum(["ielts", "toefl", "duolingo", "pte"]),
    score: z.coerce
      .number()
      .positive("Must be a positive number")
      .min(1, "Minimum of 1")
      .or(
        z.object({
          reading: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
          listening: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
          speaking: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
          writing: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
        }),
      ),
  })
  .superRefine((arg, ctx) => {
    if (
      (["ielts", "toefl"].includes(arg.examType) &&
        typeof arg.score === "number") ||
      (["pte", "duolingo"].includes(arg.examType) &&
        typeof arg.score !== "number")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid score",
        path: ["score"],
      });
    }
  });
export type ComputeEnglishProficiencySchema = z.infer<
  typeof ComputeEnglishProficiencySchema
>;

export const EnglishProficiencySchema = z
  .object({
    test: z.enum(["ielts", "toefl", "duolingo", "pte"]),
    score: z.coerce
      .number()
      .positive("Must be a positive number")
      .min(1, "Minimum of 1"),
  })
  .superRefine((arg, ctx) => {
    try {
      EnglishProficiency.getCefr(arg.test, arg.score);
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid score",
        path: ["score"],
      });
    }
  });
export type EnglishProficiencySchema = z.infer<typeof EnglishProficiencySchema>;
