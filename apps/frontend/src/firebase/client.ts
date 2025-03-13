"use client";

import { env } from "@/src/config";
import { getApps, initializeApp, getApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { FIREBASE_AUTH_EMULATOR_HOST } from "@workspace/api/lib";
import { FirebaseClient } from "@workspace/api/client";

function connectToAuthEmulator(auth: Auth) {
  if (env.appEnv) {
    connectAuthEmulator(auth, `http://${FIREBASE_AUTH_EMULATOR_HOST}`);
  }
}

let app: ReturnType<typeof initializeApp>;
const apps = getApps();
if (apps.length) {
  app = getApp();
} else {
  app = initializeApp(env.client.firebaseConfig);
}

const auth = getAuth(app);

connectToAuthEmulator(auth);
export const firebaseClient = FirebaseClient.factory(auth);
