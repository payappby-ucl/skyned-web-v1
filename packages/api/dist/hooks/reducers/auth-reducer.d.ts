import { IActionType } from "interfaces";
export declare const useAuthReducer: <T>(initialState: T) => [T, import("react").ActionDispatch<[action: IActionType<T>]>];
