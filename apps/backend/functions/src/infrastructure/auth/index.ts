import { getAuth } from "firebase-admin/auth";
import { RegistryKeysEnum } from "../../enum";
import { IAuth, IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { SkynedUtils, validationUtility } from "../../utils";
import { StatusCodes } from "http-status-codes";

SkynedUtils.initializeFirebaseApp();

/** Required dependencies to create Auth instance */
export interface AuthDependencies {
  /** for validating data */
  validationUtility: IValidationUtility;
}

/**
 * Concrete implementation of Auth interface using firebase Auth
 *
 * @class
 */

export class Auth implements IAuth {
  private static instance: IAuth | null = null;
  private auth = getAuth();
  private constructor(private readonly validationUtility: IValidationUtility) {}

  /** Creates Auth instance */

  static factory({ validationUtility }: AuthDependencies) {
    if (!Auth.instance) {
      Auth.instance = new Auth(validationUtility);
    }

    return Auth.instance;
  }

  /**
   * Gets user auth using email address
   */

  findUserByEmail: IAuth["findUserByEmail"] = async (email) => {
    try {
      this.validationUtility.validateEmail({ email });

      const { uid, email: userEmail } = await this.auth.getUserByEmail(email);

      if (!userEmail) {
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Email is not defined from firebase auth",
        );
      }

      return {
        id: uid,
        email: userEmail,
      };
    } catch (error) {
      return null;
    }
  };

  exists: IAuth["exists"] = async (email) => {
    this.validationUtility.validateEmail({ email });

    const userAuth = await this.findUserByEmail(email);
    if (!userAuth) return false;
    return true;
  };
}

/** Auth instance */
export const auth = SkynedRegistry.getSingleton(RegistryKeysEnum.AUTH, () =>
  Auth.factory({
    validationUtility,
  }),
);
