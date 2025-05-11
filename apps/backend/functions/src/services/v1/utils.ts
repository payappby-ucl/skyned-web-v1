import { department, IAdmin } from "@workspace/shared";
import { SkynedUtils } from "../../utils";
import { StatusCodes } from "http-status-codes";

export abstract class ServiceUtils {
  /**
   * Checks if a user belongs to the Executive Department
   * @param user - The user profile
   * @returns - boolean
   */

  isExecutiveMember(user: IAdmin) {
    if (!user) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Auth user is not defined",
      );
    }

    return !!user.departments?.some((dep) => dep.name === department.Executive);
  }

  /**
   * Casts Database json type of interface
   */

  protected deserialize = SkynedUtils.deserialize;
}
