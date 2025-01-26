import * as admin from "firebase-admin";
import {
  FIREBASE_AUTH_EMULATOR_HOST,
  //   FIREBASE_FUNCTION_EMULATOR_HOST,
  FIREBASE_STORAGE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_HOST,
} from "../lib";
import serviceAccount from "../../test-service-account.json";
import { IFirebaseServer } from "./interface";

export * from "./interface";
export class FirebaseServer implements IFirebaseServer {
  private static instance: IFirebaseServer | null = null;

  private constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        storageBucket: "skyned-test-31a2e.firebasestorage.app",
        projectId: "skyned-test-31a2e",
      });

      process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
      process.env.FIREBASE_STORAGE_EMULATOR_HOST =
        FIREBASE_STORAGE_EMULATOR_HOST;
      process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
    }
  }

  static factory() {
    if (!FirebaseServer.instance) {
      FirebaseServer.instance = new FirebaseServer();
    }

    return FirebaseServer.instance;
  }
}

// export const firebaseServer = FirebaseServer.factory();
