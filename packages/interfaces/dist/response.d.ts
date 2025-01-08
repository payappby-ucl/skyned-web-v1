import { StatusCodes } from "http-status-codes";
export interface IMessageResponse {
    message: string;
}
interface IResponse<T> {
    statusCode: StatusCodes;
    data: T;
}
export interface ISuccessResponse<T> extends IResponse<T> {
    success: true;
}
export interface IFailedResponse extends IResponse<IMessageResponse> {
    success: false;
}
export type ResponseType<T> = ISuccessResponse<T> | IFailedResponse;
export {};
