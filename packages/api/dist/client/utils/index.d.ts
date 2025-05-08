import { IUtils, ToastType } from "./interface";
export * from "./interface";
export declare class Utils implements IUtils {
    constructor(toast: ToastType);
    toast: IUtils["toast"];
    handleError: IUtils["handleError"];
    alertError: IUtils["alertError"];
    pick: IUtils["pick"];
    exclude: IUtils["exclude"];
    copyToClipboard: IUtils["copyToClipboard"];
}
