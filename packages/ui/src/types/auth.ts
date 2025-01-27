import { LoadedType, LoadingType } from "../interfaces";

export type AuthActionType<T> = LoadedType<T> | LoadingType;
