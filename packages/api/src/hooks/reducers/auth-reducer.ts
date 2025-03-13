import { IActionType } from "../../interfaces";
import { useReducer } from "react";

function authReducer<T>(state: T, action: IActionType<T>): T {
  switch (action.type) {
    case "loaded":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const useAuthReducer = <T>(initialState: T) => {
  return useReducer(authReducer<T>, initialState);
};
