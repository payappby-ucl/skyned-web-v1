import { IFailedResponse } from "../../http";

export interface IServerUtils {
  createServerActionError(error: IFailedResponse): Error;
}
