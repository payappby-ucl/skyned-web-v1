"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAdmin } from "@workspace/shared";
import { brandClientApi } from "@/src/lib/client";
import { Loader2Icon } from "lucide-react";

interface IAuth {
  user: IAdmin | null;
  loaded: boolean;
}

interface IAuthContext {
  auth: IAuth;
  setAuth(payload: IAuth): void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>({
    user: null,
    loaded: false,
  });

  useEffect(() => {
    brandClientApi.auth.handleStateChange(async (user, err) => {
      try {
        if (err) throw err;
        if (!user) {
          setAuth({
            user: null,
            loaded: true,
          });
          await brandClientApi.httpClient.clearTokenCookie();
          return;
        }

        const token = await user.getIdToken();
        brandClientApi.httpClient.setTokenCookie(token);
        // * Get Admin from backend and set auth context
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    });
  }, []);

  if (!auth.loaded) {
    return (
      <section className="flex h-screen w-screen items-center justify-center">
        <Loader2Icon size={14} className="text-muted-foreground animate-spin" />
      </section>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext is not initialized");

  return authContext;
};
