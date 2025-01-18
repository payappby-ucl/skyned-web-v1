import { ZodType } from "zod";

export interface IValidationData {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}
