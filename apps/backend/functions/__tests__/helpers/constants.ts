import { StatusCodes } from "http-status-codes";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export const responseBody = {
  statusCode: StatusCodes.OK,
  success: true,
  data: {
    message: "Hello",
  },
};

const clientFirebaseApp = initializeApp({
  apiKey: "AIzaSyD5Ts9NjixrL2ZgaMKO-THqs8MxWjOmUqo",
  authDomain: "skyned-test-31a2e.firebaseapp.com",
  projectId: "skyned-test-31a2e",
  storageBucket: "skyned-test-31a2e.firebasestorage.app",
  messagingSenderId: "554146787843",
  appId: "1:554146787843:web:bdcca68274a2657198d436",
  measurementId: "G-C47CT351P1",
});

export const clientAuth = getAuth(clientFirebaseApp);
connectAuthEmulator(clientAuth, "http://127.0.0.1:9099");
