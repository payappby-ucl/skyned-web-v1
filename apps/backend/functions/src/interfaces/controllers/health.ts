import { IMessageResponse, ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";

/** Represents health controller */
export interface IHealthController {
  /** Checks if server is running */
  isHealthy: RequestHandler<object, ISuccessResponse<IMessageResponse>>;
}
