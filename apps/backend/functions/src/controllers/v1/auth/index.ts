import { env } from "../../../config";
import { RegistryKeysEnum } from "../../../enum";
import { auth } from "../../../infrastructure";
import {
  IAuth,
  IAuthController,
  IEmailService,
  ITokenService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { emailService, tokenService } from "../../../services";
import { PROHIBITED_USER_EMAIL_DOMAINS, SkynedUtils } from "../../../utils";
import { StatusCodes } from "http-status-codes";

/** Required dependencies to create AuthController instance */
export interface AuthControllerDependencies {
  /** Auth infrastructure */
  auth: IAuth;
  /** Token Service */
  tokenService: ITokenService;
  /** Email Service */
  emailService: IEmailService;
}

/**
 * Concrete implementation for Auth controller
 *
 * @class
 */
export class AuthController implements IAuthController {
  private static instance: IAuthController | null = null;
  private constructor(
    private readonly auth: IAuth,
    private readonly tokenService: ITokenService,
    private readonly emailService: IEmailService,
  ) {}

  /**
   * Creates the AuthController instance
   */

  static factory({
    auth,
    tokenService,
    emailService,
  }: AuthControllerDependencies) {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController(
        auth,
        tokenService,
        emailService,
      );
    }

    return AuthController.instance;
  }

  /**
   * Process email and send email verification link
   */

  sendEmailVerificationLink: IAuthController["sendEmailVerificationLink"] =
    async (req, res, next) => {
      try {
        const { email } = req.body;
        if (!email) {
          throw SkynedUtils.createException(
            StatusCodes.BAD_REQUEST,
            "Invalid input",
          );
        }

        const emailHasProhibitedDomain = PROHIBITED_USER_EMAIL_DOMAINS.some(
          (domain) => email.endsWith(domain),
        );

        if (emailHasProhibitedDomain) {
          throw SkynedUtils.createException(
            StatusCodes.BAD_REQUEST,
            "You cannot create an account with this email address.",
          );
        }

        // * Check if email already exist
        const emailAlreadyExist = await this.auth.exists(email);
        if (emailAlreadyExist) {
          throw SkynedUtils.createException(
            StatusCodes.BAD_REQUEST,
            `${email} already belongs to an existing user`,
          );
        }

        // * Create token
        const token = this.tokenService.sign({ email });

        // * save token to database
        const savedToken = await this.tokenService.createToken({
          type: "verify",
          token,
          expiresIn: new Date(Date.now() + 60 * 60 * 1000),
        });

        // * send email
        await this.emailService.send({
          from: {
            email: env.emails.noreply,
          },
          to: [email],
          subject: "Verify Your Email Address",
          template: {
            type: "verify",
            data: {
              tokenId: savedToken.tokenId,
            },
          },
        });

        res._success(StatusCodes.OK, {
          message: `A verification mail has been sent to ${email}`,
        });
      } catch (error) {
        next(error);
      }
    };
}

/** AuthController instance */
export const authController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.AUTH_CONTROLLER,
  () =>
    AuthController.factory({
      auth,
      tokenService,
      emailService,
    }),
);
