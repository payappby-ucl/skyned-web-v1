import { IFailedResponse } from "@skyned/interfaces";
import { ErrorRequestHandler, RequestHandler } from "express";

export interface IExceptionController {
  handle404: RequestHandler<object, IFailedResponse>;
  handleAllPossibleErrors: ErrorRequestHandler<object, IFailedResponse>;
}
