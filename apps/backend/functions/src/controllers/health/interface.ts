import { IMessageResponse, ISuccessResponse } from "@skyned/utils";
import { RequestHandler } from "express";

export interface IHealthController {
  isHealthy: RequestHandler<object, ISuccessResponse<IMessageResponse>>;
}
