"use client";

import { firebaseClient } from "@/firebase/client";
import { Auth } from "@/interfaces";
import { AuthActionsEnum } from "@workspace/ui/enums";
import useAuthReducer from "@workspace/ui/hooks/reducers/auth-reducer";
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
  const [state, dispatch] = useAuthReducer<Auth>({ currentUser: null });

  useEffect(() => {
    firebaseClient.auth.listenForAuthStateChange((user) => {
      dispatch({
        type: AuthActionsEnum.loaded,
        payload: {
          currentUser: user,
        },
      });
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
