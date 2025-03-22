import { StatusCodes } from "http-status-codes";
/** Message type interface used mostly on responses from the server */
export interface IMessageResponse {
    /** The Message */
    message: string;
}
/** Part of the server response interface */
interface IResponse {
    statusCode: StatusCodes;
}
/** Successful server response interface */
export interface ISuccessResponse<T> extends IResponse {
    success: true;
    data: T;
}
/** Failed server response interface */
export interface IFailedResponse extends IResponse {
    success: false;
    data: IMessageResponse;
}
/** Server response type */
export type ResponseType<T> = ISuccessResponse<T> | IFailedResponse;
export {};
