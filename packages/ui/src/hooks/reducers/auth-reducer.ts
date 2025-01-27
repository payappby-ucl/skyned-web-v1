import { AuthActionsEnum } from "@workspace/ui/enums";
import { AuthActionType } from "@workspace/ui/types";
import { useReducer } from "react";

function authReducer<T>(state: T, action: AuthActionType<T>) {
  switch (action.type) {
    case AuthActionsEnum.loaded:
      return {
        ...state,
        ...action.payload,
      };
    case AuthActionsEnum.loading:
      return {
        ...state,
      };
    default:
      return state;
  }
}

const useAuthReducer = <T>(initialState: T) => {
  return useReducer(authReducer<T>, initialState);
};

export default useAuthReducer;
