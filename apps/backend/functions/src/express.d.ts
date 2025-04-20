import { IAdmin } from "@workspace/shared";
import { _failed, _success } from "./middleware";

declare global {
  /** @namespace */
  namespace Express {
    interface Response {
      _success: typeof _success;
      _failed: typeof _failed;
    }
    interface Request {
      skynedAuth: {
        admin?: IAdmin;
        // TODO: Add student interface
        student?: "";
      };
    }
  }
}
