import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class Exception extends Error {
  statusCode: StatusCodes;
  constructor(statusCode: StatusCodes, message?: string) {
    super(message || getReasonPhrase(statusCode));
    this.statusCode = statusCode;
  }
}
