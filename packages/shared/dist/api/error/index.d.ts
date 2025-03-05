import { IBrandApi } from "../interface";
import { IError } from "./interface";
export * from "./interface";
export declare class BrandError implements IError {
    private toast;
    constructor(toast: IBrandApi["toast"]);
    handleError: IError["handleError"];
    alertError: IError["alertError"];
}
