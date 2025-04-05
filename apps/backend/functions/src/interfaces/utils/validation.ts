import { ZodType } from "zod";

/** Represents Validation utility */
export interface IValidationUtility {
  /** Validates an input */
  validateInput<T>(data: {
    schema: ZodType;
    inputData: T;
    errorType?: "server" | "client";
    message?: string;
  }): T;
}
