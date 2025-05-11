import { StatusCodes } from "http-status-codes";
import { IAdminService, IAuth, IAuthMiddleware } from "../interfaces";
import { SkynedUtils } from "../utils";
import SkynedRegistry from "../registry";
import { RegistryKeysEnum } from "../enum";
import { adminService } from "../services";
import { auth } from "../infrastructure";

/**
 * Represents dependencies needed to instantiate concrete {IAuthMiddleware}
 */
export interface IAuthMiddlewareDependencies {
  auth: IAuth;
  adminService: IAdminService;
}

/**
 * Concrete implementation of AuthMiddleware
 *
 * @class
 */

export class AuthMiddleware implements IAuthMiddleware {
  private static instance: IAuthMiddleware | null = null;

  private constructor(
    private readonly auth: IAuth,
    private readonly adminService: IAdminService,
  ) {}

  static factory({ auth, adminService }: IAuthMiddlewareDependencies) {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware(auth, adminService);
    }

    return AuthMiddleware.instance;
  }

  authenticate: IAuthMiddleware["authenticate"] = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers["authorization"];
      if (!authorizationHeader) {
        throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
      }

      const [authType, token] = authorizationHeader.split(" ");
      if (authType.toLowerCase() !== "bearer" || !token) {
        throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
      }

      const authUser = await this.auth.verifyIdToken({ token });
      if (!authUser) {
        throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
      }

      switch (authUser.claim) {
        case "admin":
          {
            const admin = await this.adminService.findAdminByAdminId(
              authUser.id,
              "auth",
            );

            if (!admin) {
              throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
            }

            req.skynedAuth = {
              ...(req.skynedAuth || {}),
              admin,
            };
          }
          break;
        case "student":
          {
            // TODO: Get Student
            req.skynedAuth = {
              ...(req.skynedAuth || {}),
              student: "",
            };
          }
          break;
        default:
          throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
      }

      req.skynedAuth.claim = authUser.claim;

      next();
    } catch (error) {
      next(error);
    }
  };

  hasRole: IAuthMiddleware["hasRole"] = (roles) => (req, res, next) => {
    try {
      const { skynedAuth } = req;
      if (!skynedAuth) {
        throw SkynedUtils.createException(StatusCodes.UNAUTHORIZED);
      }

      if (!roles.some((role) => !!skynedAuth[role])) {
        throw SkynedUtils.createException(StatusCodes.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export const authMiddleware = SkynedRegistry.getSingleton(
  RegistryKeysEnum.AUTH_MIDDLEWARE,
  () =>
    AuthMiddleware.factory({
      adminService,
      auth,
    }),
);
