"use client";

import { useCallback } from "react";
import { useAuth } from "./providers/auth-provider";
import { firebaseClient } from "@/firebase/client";
import { SignInProviderEnum } from "@workspace/utils/enums";

const Nav: React.FC = () => {
  const [auth] = useAuth();
  const signInWithGoogle = useCallback(async () => {
    try {
      await firebaseClient.auth.signInWithProvider(SignInProviderEnum.google);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await firebaseClient.auth.logout();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <header>
      {auth.currentUser ? (
        <div>
          <p>{auth.currentUser.displayName}</p>
          <p>{auth.currentUser.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signInWithGoogle()}>Login with google</button>
      )}
    </header>
  );
};

export default Nav;
