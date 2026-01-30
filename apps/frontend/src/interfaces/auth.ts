import { User } from "firebase/auth";

export interface Auth {
  currentUser: User | null;
  loaded: boolean;
}
