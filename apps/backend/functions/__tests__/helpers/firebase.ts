import { getFirestore } from "firebase-admin/firestore";
import { FirebaseServer } from "@workspace/firebase";

export const initializeFirebase = () => {
  FirebaseServer.factory();
};

export const clearAllFirestoreData = async () => {
  await getFirestore().recursiveDelete(getFirestore().collection("test"));
};
