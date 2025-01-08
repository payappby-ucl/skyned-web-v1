import { _failed, _success } from "./middleware";

declare global {
  namespace Express {
    interface Response {
      _success: typeof _success;
      _failed: typeof _failed;
    }
    //   interface Request {}
  }
}
