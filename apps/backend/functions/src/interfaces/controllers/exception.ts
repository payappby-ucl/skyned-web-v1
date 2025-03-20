import { IFailedResponse } from "@workspace/shared";
import { ErrorRequestHandler, RequestHandler } from "express";

/** Represents interface for exception controller */
export interface IExceptionController {
  /** handles routes not defined in the app server */
  handle404: RequestHandler<object, IFailedResponse>;
  /** Error boundary for any possible errors */
  handleAllPossibleErrors: ErrorRequestHandler<object, IFailedResponse>;
}
