import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { env } from "./env";

let app: ReturnType<typeof initializeApp>;
if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(env.client.firebaseConfig);
}

const auth = getAuth(app);
if(env.appEnv === "emulator") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export { auth };
