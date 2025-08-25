import { z } from "zod";
import { Country } from "country-state-city";

export const ProgramQuerySchema = z.object({
  country: z
    .string()
    .refine((val) => val.split(",").every((v) => !!Country.getCountryByCode(v)))
    .optional()
    .transform((val) => val && val.split(",")),

  state: z
    .string()
    .refine((val) => val.split(",").every((v) => !!Country.getCountryByCode(v)))
    .optional()
    .transform((val) => val && val.split(",")),

  schoolId: z.string().optional(),
  term: z.string().trim().optional(),

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
