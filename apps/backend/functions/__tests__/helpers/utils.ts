import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "./constants";
import { admin } from "../../src/data";

export async function signInUser(email?: string, password?: string) {
  return await signInWithEmailAndPassword(
    clientAuth,
    email || admin.email,
    password || "12345678",
  );
}
