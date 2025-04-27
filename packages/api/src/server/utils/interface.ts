import { IFailedResponse } from "../../http";

export interface IServerUtils {
  createServerActionError(error: IFailedResponse): Error;
  constructQuery(data: Record<string, string | null>): URLSearchParams;
  constructTags(
    data: Record<
      string,
      {
        prefix: string;
        value: string | null;
      }
    >,
    base: string[],
  ): string[];
}
