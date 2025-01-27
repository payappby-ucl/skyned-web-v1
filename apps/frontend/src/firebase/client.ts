"use client";

import { env } from "@/config";
import { getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { FIREBASE_AUTH_EMULATOR_HOST } from "@workspace/firebase/lib";
import { FirebaseClient } from "@workspace/firebase/client";

function connectToAuthEmulator(auth: Auth) {
  if (env.appEnv) {
    connectAuthEmulator(auth, `http://${FIREBASE_AUTH_EMULATOR_HOST}`);
  }
}

let auth: Auth | null;
const apps = getApps();
if (apps.length) {
  auth = getAuth(apps[0]);
  connectToAuthEmulator(auth);
} else {
  const app = initializeApp(env.firebaseConfig);
  auth = getAuth(app);
  connectToAuthEmulator(auth);
}

export const firebaseClient = FirebaseClient.factory(auth);
