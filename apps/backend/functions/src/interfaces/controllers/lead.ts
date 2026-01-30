import {
  ISuccessResponse,
  IMessageResponse,
  ApplyFormSchema,
} from "@workspace/shared";
import { RequestHandler } from "express";

export interface ILeadController {
  /** Send Lead to comms */
  sendLeadToComms: RequestHandler<
    object,
    ISuccessResponse<IMessageResponse>,
    ApplyFormSchema
  >;
}
