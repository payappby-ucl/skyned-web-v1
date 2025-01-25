import * as admin from "firebase-admin";
import {
  FIRESTORE_EMULATOR_HOST,
  FIREBASE_STORAGE_EMULATOR_HOST,
  FIREBASE_AUTH_EMULATOR_HOST,
} from "@workspace/firebase";
import serviceAccount from "../../src/test-service-account.json";
import { getFirestore } from "firebase-admin/firestore";

export const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: "skyned-test-31a2e.firebasestorage.app",
      projectId: "skyned-test-31a2e",
    });

    process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = FIREBASE_STORAGE_EMULATOR_HOST;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
  }
};

export const clearAllFirestoreData = async () => {
  await getFirestore().recursiveDelete(getFirestore().collection("test"));
};
