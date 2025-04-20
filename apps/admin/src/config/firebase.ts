import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "./env";

let app: ReturnType<typeof initializeApp>;
if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(env.client.firebaseConfig);
}

const auth = getAuth(app);

export { auth };
