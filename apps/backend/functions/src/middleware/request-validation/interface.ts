import { AnyZodObject } from "zod";

export interface IValidationData {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}
