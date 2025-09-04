import { z } from "zod";
import { Country, State } from "country-state-city";
import {
  degreeTypes,
  institutionType,
  ownershipType,
  tuitionFeeType,
} from "@workspace/shared";

export const ProgramQuerySchema = z.object({
  country: z
    .string()
    .refine((val) => val.split(",").every((v) => !!Country.getCountryByCode(v)))
    .optional()
    .transform((val) => val && val.split(",")),

  state: z
    .string()
    .refine((val) => val.split(",").every((v) => !!State.getStateByCode(v)))
    .optional()
    .transform((val) => val && val.split(",")),

  schoolId: z.string().optional(),
  term: z.string().trim().optional(),

  institutionType: z
    .string()
    .refine((val) =>
      val
        .split(",")
        .every((v) =>
          [institutionType.college, institutionType.university].includes(
            v as (typeof institutionType)[keyof typeof institutionType],
          ),
        ),
    )
    .optional()
    .transform((val) => val && val.split(",")),

  ownershipType: z
    .string()
    .refine((val) =>
      val
        .split(",")
        .every((v) =>
          [ownershipType.private, ownershipType.public].includes(
            v as (typeof ownershipType)[keyof typeof ownershipType],
          ),
        ),
    )
    .optional()
    .transform((val) => val && val.split(",")),

  accommodation: z.coerce.boolean().optional(),

  // * Programs Specific Filters
  degreeType: z
    .string()
    .refine(
      (val) =>
        val &&
        val
          .split(",")
          .every((val) =>
            degreeTypes.includes(val as (typeof degreeTypes)[number]),
          ),
    )
    .optional()
    .transform((val) => val && val.split(",")),

  pgwp: z.coerce.boolean().optional(),

  minimumEducationLevel: z
    .string()
    .refine((val) =>
      val
        .split(",")
        .every((v) =>
          ["primary", "secondary", "undergraduate", "postgraduate"].includes(v),
        ),
    )
    .optional()
    .transform((val) => val && val.split(",")),

  tuitionFeeType: z
    .string()
    .refine((val) =>
      val
        .split(",")
        .every((v) =>
          tuitionFeeType.includes(v as (typeof tuitionFeeType)[number]),
        ),
    )
    .optional()
    .transform((val) => val && val.split(",")),

  orderBy: z
    .string()
    .trim()
    .optional()
    .refine((val) =>
      val && !["desc", "asc"].includes(val.split(",")[1]) ? false : true,
    )
    .transform((val) => {
      if (!val) return undefined;
      const [orderBy, order] = val.split(",");
      return {
        [orderBy]: order,
      };
    }),
});
export type ProgramQuerySchema = z.infer<typeof ProgramQuerySchema>;
