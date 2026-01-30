import { IServerUtils } from "./interface";
export * from "./interface";

export class ServerUtils implements IServerUtils {
  createServerActionError: IServerUtils["createServerActionError"] = (
    error,
  ) => {
    return {
      success: false,
      message:
        error?.message ||
        error?.data?.message ||
        "Something went wrong, Please check your connection and try again.",
    };
    // return new Error(error?.data?.message || "", {
    //   cause: {
    //     statusCode: error.statusCode,
    //     success: false,
    //     data: error.data,
    //   },
    // });
  };

  constructQuery: IServerUtils["constructQuery"] = (data) => {
    const queries = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        queries.append(key, value);
      }
    });

    return queries;
  };

  constructTags: IServerUtils["constructTags"] = (data, base) => {
    Object.entries(data).forEach(([key, { value, prefix }]) => {
      if (value) {
        base.push(`${prefix}-${value}`);
      }
    });

    return base;
  };
}
