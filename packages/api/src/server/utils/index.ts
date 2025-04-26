import { IServerUtils } from "./interface";
export * from "./interface";

export class ServerUtils implements IServerUtils {
  createServerActionError: IServerUtils["createServerActionError"] = (
    error,
  ) => {
    return new Error(error?.data?.message || "", {
      cause: {
        statusCode: error.statusCode,
        success: false,
        data: error.data,
      },
    });
  };
}
