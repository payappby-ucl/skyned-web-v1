import { getAuth } from "firebase-admin/auth";
import { RegistryKeysEnum } from "../../enum";
import { IAuth, IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { SkynedUtils, validationUtility } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { AuthClaim, RegisterSchema } from "@workspace/shared";
import {
  AuthCreationSchema,
  AuthUpdateSchema,
  TokenVerifySchema,
} from "./schema";

export * from "./schema";

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
      this.validationUtility.validateInput({
        schema: RegisterSchema,
        inputData: {
          email,
        },
      });

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

  /**
   * Checks if a user auth already exist
   */

  exists: IAuth["exists"] = async (email) => {
    this.validationUtility.validateInput({
      schema: RegisterSchema,
      inputData: {
        email,
      },
    });

    const userAuth = await this.findUserByEmail(email);
    if (!userAuth) return false;
    return true;
  };

  /**
   * Creates user auth
   */

  createAuth: IAuth["createAuth"] = async (data, claim) => {
    this.validationUtility.validateInput({
      schema: AuthCreationSchema,
      inputData: {
        ...data,
        claim,
      },
    });

    let userAuth: Awaited<ReturnType<typeof this.auth.createUser>> | null =
      null;

    try {
      userAuth = await this.auth.createUser({
        ...data,
      });
    } catch (error: any) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }

    await this.auth.setCustomUserClaims(userAuth.uid, { role: claim });
    return userAuth.uid;
  };

  /** Update Auth Data */

  updateAuth: IAuth["updateAuth"] = async (authId, data) => {
    const { adminId, ...rest } = this.validationUtility.validateInput({
      schema: AuthUpdateSchema,
      inputData: {
        ...data,
        adminId: authId,
      },
    });

    try {
      await this.auth.updateUser(adminId, {
        ...rest,
      });
    } catch (error: any) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  };

  /**
   * Verify user token
   */

  verifyIdToken: IAuth["verifyIdToken"] = async (data) => {
    try {
      this.validationUtility.validateInput({
        schema: TokenVerifySchema,
        inputData: data,
      });

      let user: Awaited<ReturnType<typeof this.auth.getUser>> | null;
      try {
        const { uid } = await this.auth.verifyIdToken(data.token);
        user = await this.auth.getUser(uid);
      } catch (error) {
        return null;
      }

      const { uid: id, customClaims } = user;
      if (!customClaims) {
        return null;
      }

      const role = customClaims.role as AuthClaim["claim"];
      if (!role) return null;
      return {
        id,
        claim: role,
      };
    } catch (error) {
      return null;
    }
  };
}

/** Auth instance */
export const auth = SkynedRegistry.getSingleton(RegistryKeysEnum.AUTH, () =>
  Auth.factory({
    validationUtility,
  }),
);
