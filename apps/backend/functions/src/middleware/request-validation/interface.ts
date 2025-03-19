import { ZodType } from "zod";

/** Interface for validation inputs */
export interface IValidationData {
  /** Represents the request body */
  body?: ZodType;
  /** Represents the request query parameters */
  query?: ZodType;
  /** Represents the request params */
  params?: ZodType;
}
