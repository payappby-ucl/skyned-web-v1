import { IMessageResponse, ISuccessResponse } from "@skyned/interfaces";
import { RequestHandler } from "express";

export interface IHealthController {
  isHealthy: RequestHandler<object, ISuccessResponse<IMessageResponse>>;
}
