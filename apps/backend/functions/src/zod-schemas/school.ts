import { financialAids } from "@workspace/shared";
import { z } from "zod";

export const SchoolQuerySchema = z.object({
  term: z.string().trim().optional(),
  financialAids: z
    .string()
    .toLowerCase()
    .refine(
      (val) =>
        val &&
        val
          .split(",")
          .every((val) =>
            financialAids.includes(val as (typeof financialAids)[number]),
          ),
    )
    .optional()
    .transform((val) => val && val.split(",")),
});
export type SchoolQuerySchema = z.infer<typeof SchoolQuerySchema>;
