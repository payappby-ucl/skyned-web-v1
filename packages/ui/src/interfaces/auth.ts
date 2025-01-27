import { AuthActionsEnum } from "../enums";

export interface LoadingType {
  type: AuthActionsEnum.loading;
}

export interface LoadedType<T> {
  type: AuthActionsEnum.loaded;
  payload: T | null;
}
