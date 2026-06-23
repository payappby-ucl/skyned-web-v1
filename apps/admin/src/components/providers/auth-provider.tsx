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
import {
  AUTH_TIME_STORAGE_NAME,
  COOKIE_EXPIRATION,
  COOKIE_EXPIRATION_UNIT,
} from "@workspace/api/lib";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../loading";

interface IAuth {
  user: IAdmin | null;
  loaded: boolean;
}

interface IAuthContext {
  auth: IAuth;
  setAuth(payload: IAuth): void;
}

const AuthContext = createContext<IAuthContext | null>(null);
const authPathnames = ["/login", "/forgot-password", "/reset-password"];

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<IAuth>({
    user: null,
    loaded: false,
  });

  useEffect(() => {
    brandClientApi.auth.handleStateChange(async (user, err) => {
      try {
        if (err) throw err;
        if (!user) {
          await brandClientApi.httpClient.clearTokenCookie();

          brandClientApi.storage.localStorage.deleteItem(
            AUTH_TIME_STORAGE_NAME,
          );

          setAuth({
            user: null,
            loaded: true,
          });
          router.replace("/login");
          return;
        }

        // * check last seen
        const lastSeen = brandClientApi.storage.localStorage.getItem(
          AUTH_TIME_STORAGE_NAME,
        );

        if (
          lastSeen &&
          brandClientApi.date.difference({
            prevDate: lastSeen,
            unit: COOKIE_EXPIRATION_UNIT,
          }) > COOKIE_EXPIRATION
        ) {
          router.replace("/login");
          await brandClientApi.auth.logout();
          return;
        }

        const token = await user.getIdToken();
        await brandClientApi.httpClient.setTokenCookie(token);
        // * Get Admin from backend and set auth context
        const { data } = await brandClientApi.httpClient.request<IAdmin>(
          "/admins/me",
          "GET",
        );

        setAuth({
          user: data,
          loaded: true,
        });

        if (authPathnames.includes(pathname)) {
          router.replace("/");
        }
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    });
  }, []);

  if (
    !auth.loaded ||
    (auth.loaded && !auth.user && !authPathnames.includes(pathname))
  ) {
    return <Loading />;
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
