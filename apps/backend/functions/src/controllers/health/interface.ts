import { IMessageResponse, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";

export interface IHealthController {
  isHealthy: RequestHandler<object, ISuccessResponse<IMessageResponse>>;
}
