import { StatusCodes } from "http-status-codes";

export const responseBody = {
  statusCode: StatusCodes.OK,
  success: true,
  data: {
    message: "Hello",
  },
};
