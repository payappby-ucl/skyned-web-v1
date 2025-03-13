import { StatusCodes } from "http-status-codes";
export interface IMessageResponse {
    message: string;
}
interface IResponse {
    statusCode: StatusCodes;
}
export interface ISuccessResponse<T> extends IResponse {
    success: true;
    data: T;
}
export interface IFailedResponse extends IResponse {
    success: false;
    data: IMessageResponse;
}
export type ResponseType<T> = ISuccessResponse<T> | IFailedResponse;
export {};
