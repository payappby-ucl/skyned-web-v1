import { StatusCodes, getReasonPhrase } from "http-status-codes";

/**
 * Custom exception class used as base error
 *
 * @class
 */
export class Exception extends Error {
  /** HTTP status code representing the type of error */
  statusCode: StatusCodes;
  constructor(statusCode: StatusCodes, message?: string) {
    super(message || getReasonPhrase(statusCode));
    this.statusCode = statusCode;
  }
}
