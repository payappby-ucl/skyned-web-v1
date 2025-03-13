"use client";

import { Auth } from "@/src/interfaces";
import { brandClientApi } from "@/src/lib/client";
import { useAuthReducer } from "@workspace/api/hooks";
import { IActionType } from "@workspace/api/interfaces";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext<ReturnType<
  typeof useAuthReducer<Auth>
> | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useAuthReducer<Auth>({
    currentUser: null,
    loaded: false,
  }) as [Auth, React.ActionDispatch<[action: IActionType<Auth>]>];

  useEffect(() => {
    brandClientApi.auth.handleStateChange(async (user) => {
      if (user) {
        dispatch({
          type: "loaded",
          payload: {
            currentUser: null,
            loaded: true,
          },
        });
      } else {
        dispatch({
          type: "loaded",
          payload: {
            currentUser: null,
            loaded: true,
          },
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth Context not initialized");
  }

  return context;
};
