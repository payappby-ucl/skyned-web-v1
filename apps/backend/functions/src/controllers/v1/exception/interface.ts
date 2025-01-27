import { IFailedResponse } from "@skyned/utils";
import { ErrorRequestHandler, RequestHandler } from "express";

export interface IExceptionController {
  handle404: RequestHandler<object, IFailedResponse>;
  handleAllPossibleErrors: ErrorRequestHandler<object, IFailedResponse>;
}
