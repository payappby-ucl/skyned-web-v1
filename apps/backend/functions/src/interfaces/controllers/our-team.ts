import { ISuccessResponse } from "@workspace/shared";
import { RequestHandler } from "express";
import { IOurTeamService } from "../services";
import { PageQuerySchema } from "../../zod-schemas";

/** Represents interface for auth controller */
export interface IOurTeamController {
  getOurTeam: RequestHandler<
    object,
    ISuccessResponse<Awaited<ReturnType<IOurTeamService["getOurTeam"]>>>,
    void,
    Partial<Pick<PageQuerySchema, "limit">>
  >;
}
