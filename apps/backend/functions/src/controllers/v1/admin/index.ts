/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
import { StatusCodes } from "http-status-codes";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import {
  IAdminController,
  IAdminService,
  IAnalyticsService,
  IAuth,
  IDepartmentService,
  IIDGeneratorService,
  IPhoneNumberService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ControllerUtils } from "../utils";
import {
  adminService,
  analyticsService,
  departmentService,
  idGeneratorService,
  phoneNumberService,
  storageService,
} from "../../../services";
import { auth } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";
import { env } from "../../../config";
import { IPublisher, publisher } from "../../../publisher";

/** Required dependencies to create AdminController instance */
export interface AdminControllerDependencies {
  auth: IAuth;
  adminService: IAdminService;
  departmentService: IDepartmentService;
  storageService: IStorageService;
  idGeneratorService: IIDGeneratorService;
  phoneNumberService: IPhoneNumberService;
  publisher: IPublisher;
  analyticsService: IAnalyticsService;
}

/**
 * Concrete implementation for Admin controller
 *
 * @class
 */

export class AdminController
  extends ControllerUtils
  implements IAdminController
{
  private static instance: IAdminController | null = null;
  private constructor(
    private readonly auth: IAuth,
    private readonly adminService: IAdminService,
    private readonly departmentService: IDepartmentService,
    private readonly storageService: IStorageService,
    private readonly idGeneratorService: IIDGeneratorService,
    private readonly phoneNumberService: IPhoneNumberService,
    private readonly publisher: IPublisher,
    private readonly analyticsService: IAnalyticsService,
  ) {
    super();
  }

  /**
   * Creates the AdminController instance
   */

  static factory({
    auth,
    adminService,
    departmentService,
    storageService,
    idGeneratorService,
    phoneNumberService,
    publisher,
    analyticsService,
  }: AdminControllerDependencies) {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController(
        auth,
        adminService,
        departmentService,
        storageService,
        idGeneratorService,
        phoneNumberService,
        publisher,
        analyticsService,
      );
    }

    return AdminController.instance;
  }

  getMe: IAdminController["getMe"] = async (req, res, next) => {
    try {
      const { user } = this._validateAdmin(req);
      res._success(StatusCodes.OK, user);
    } catch (error) {
      next(error);
    }
  };

  createAdmin: IAdminController["createAdmin"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      const { body } = req;

      this._attributeBasedAccessControl(authUser, "admins", "create", body);

      const accountExists = await this.auth.exists(body.email);

      if (accountExists) {
        throw SkynedUtils.createException(
          StatusCodes.CONFLICT,
          `${body.email} is already an existing account.`,
        );
      }

      const validDepartments =
        await this.departmentService.fetchDepartmentsInArrayListWithIds(
          body.departments.map((dep) => dep.id),
        );

      body.departments = validDepartments.map((dep) => ({
        id: dep.id,
        name: dep.name,
      }));

      if (!body.departments.length) {
        throw SkynedUtils.createException(
          StatusCodes.BAD_REQUEST,
          "Please enter a valid department",
        );
      }

      const password = SkynedUtils.isEnvironment(["test"])
        ? "12345678"
        : this.idGeneratorService.id(10);

      const uid = await this.auth.createAuth(
        {
          email: body.email,
          password,
        },
        "admin",
      );

      const promises = [
        this.storageService.saveObject(
          body.primaryImage,
          SkynedUtils.resolveStoragePath({
            type: "primaryImage",
            data: {
              adminId: uid,
            },
          }),
        ),
      ];

      if (body.secondaryImage) {
        promises.push(
          this.storageService.saveObject(
            body.secondaryImage,
            SkynedUtils.resolveStoragePath({
              type: "secondaryImage",
              data: {
                adminId: uid,
              },
            }),
          ),
        );
      }

      const storageResponses = await Promise.all(promises);
      const primaryImage = storageResponses[0];
      const secondaryImage = storageResponses[1] || undefined;
      const phoneNumber = body.phoneNumber
        ? this.phoneNumberService.formatPhoneNumber(body.phoneNumber)
        : undefined;

      const admin = await this.adminService.createAdmin(
        {
          ...SkynedUtils.exclude(body, [
            "departments",
            "phoneNumber",
            "primaryImage",
            "secondaryImage",
          ]),
          adminId: uid,
          createdById: authUser.user.adminId,
          primaryImage,
          phoneNumber: phoneNumber
            ? {
                ...phoneNumber,
              }
            : undefined,
          secondaryImage,
        },
        body.departments.map((dep) => dep.id),
      );

      if (!SkynedUtils.isEnvironment(["test"])) {
        this.publisher.publish({
          type: EventsEnum.SEND_EMAIL_EVENT,
          data: {
            from: {
              email: env.emails.info,
              name: "Management",
            },
            subject: "Account Creation",
            to: [admin.email],
            template: {
              type: "create-admin-account",
              data: {
                ...SkynedUtils.pick(admin, ["firstName", "lastName", "email"]),
                password,
                image: primaryImage,
              },
            },
          },
        });
      }

      res._success(StatusCodes.CREATED, admin);
    } catch (error) {
      next(error);
    }
  };

  getAdminList: IAdminController["getAdminList"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      this._attributeBasedAccessControl(authUser, "admins", "list");
      const { from, to, limit, page } = req.query;

      const construct = this._constructPaginationData({ limit, page });

      const total = await this.adminService.countAdminsForList(authUser.user);
      const adminList = await this.adminService.listAdmins(authUser.user, {
        ...SkynedUtils.pick(construct, ["skip", "take"]),
        from,
        to,
      });

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        total,
        data: adminList,
      });
    } catch (error) {
      next(error);
    }
  };

  getAdminProfile: IAdminController["getAdminProfile"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);
      const { adminId } = req.params;

      const admin = await this.adminService.getAdminProfile(
        authUser.user,
        adminId,
      );

      if (!admin) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Cannot find the resource you're looking for.",
        );
      }

      this._attributeBasedAccessControl(authUser, "admins", "read", admin);
      res._success(StatusCodes.OK, admin);
    } catch (error) {
      next(error);
    }
  };

  updateAdminProfile: IAdminController["updateAdminProfile"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authClaim = this._validateAdmin(req);
      const { body } = req;
      const { adminId } = req.params;

      const admin = await this.adminService.getAdminProfile(
        authClaim.user,
        adminId,
      );

      if (!admin) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        authClaim,
        "admins",
        "update",
        body,
        admin,
      );

      // * Check Email
      if (body.email && body.email !== admin.email) {
        const emailAlreadyExist = await this.auth.exists(body.email);
        if (emailAlreadyExist) {
          throw SkynedUtils.createException(
            StatusCodes.CONFLICT,
            `${body.email} is already an existing account.`,
          );
        }

        await this.auth.updateAuth(admin.adminId, { email: body.email });
      }

      let primaryImage:
        | {
            url: string;
            path: string;
            mimeType: string;
          }
        | undefined;

      if (body.primaryImage) {
        primaryImage = await this.storageService.saveObject(
          body.primaryImage,
          SkynedUtils.resolveStoragePath({
            type: "primaryImage",
            data: {
              adminId: admin.adminId,
            },
          }),
        );
      }

      let secondaryImage:
        | {
            url: string;
            path: string;
            mimeType: string;
          }
        | undefined;

      if (body.secondaryImage) {
        secondaryImage = await this.storageService.saveObject(
          body.secondaryImage,
          SkynedUtils.resolveStoragePath({
            type: "secondaryImage",
            data: {
              adminId: admin.adminId,
            },
          }),
        );
      }

      const phoneNumber = body.phoneNumber
        ? this.phoneNumberService.formatPhoneNumber(body.phoneNumber)
        : undefined;

      const updateAdmin = await this.adminService.updateAdmin(admin.adminId, {
        ...SkynedUtils.exclude(body, [
          "phoneNumber",
          "primaryImage",
          "secondaryImage",
        ]),
        primaryImage,
        phoneNumber: phoneNumber
          ? {
              ...phoneNumber,
            }
          : undefined,
        secondaryImage,
      });

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          action: "update",
          adminId: authClaim.user.id,
          message: "Updated an admin profile",
          resource: "admins",
          resourceId: admin.id,
          previousState: admin,
          currentState: updateAdmin,
        },
      });

      res._success(StatusCodes.OK, { message: "Profile Updated" });
    } catch (error) {
      next(error);
    }
  };

  deactivateAccount: IAdminController["deactivateAccount"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const adminUser = this._validateAdmin(req);
      const { adminId } = req.params;

      const adminToSuspend = await this.adminService.getAdminProfile(
        adminUser.user,
        adminId,
      );

      if (!adminToSuspend) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        adminUser,
        "admins",
        "deactivate",
        adminToSuspend,
      );

      if (adminToSuspend.accountSuspended) {
        throw SkynedUtils.createException(
          StatusCodes.BAD_REQUEST,
          `${adminToSuspend.firstName} ${adminToSuspend.lastName}'s account is already inactive`,
        );
      }

      const updatedData = await this.adminService.updateAdmin(
        adminToSuspend.adminId,
        {
          accountSuspended: true,
        },
      );

      await this.auth.updateAuth(adminToSuspend.adminId, {
        disabled: true,
      });

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          action: "deactivate",
          message: `Deactivated / Suspended ${adminToSuspend.firstName} ${adminToSuspend.lastName}'s Account`,
          resource: "admins",
          adminId: adminUser.user.id,
          resourceId: adminToSuspend.id,
          previousState: adminToSuspend,
          currentState: updatedData,
        },
      });

      // TODO: Publish a suspended email to the suspended admin

      res._success(StatusCodes.OK, {
        message: `${adminToSuspend.firstName} ${adminToSuspend.lastName}'s account has been deactivated.`,
      });
    } catch (error) {
      next(error);
    }
  };

  activateAccount: IAdminController["activateAccount"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const adminUser = this._validateAdmin(req);
      const { adminId } = req.params;

      const adminToSuspend = await this.adminService.getAdminProfile(
        adminUser.user,
        adminId,
      );

      if (!adminToSuspend) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Resource not found",
        );
      }

      this._attributeBasedAccessControl(
        adminUser,
        "admins",
        "activate",
        adminToSuspend,
      );

      if (!adminToSuspend.accountSuspended) {
        throw SkynedUtils.createException(
          StatusCodes.BAD_REQUEST,
          `${adminToSuspend.firstName} ${adminToSuspend.lastName}'s account is already active`,
        );
      }

      const updatedData = await this.adminService.updateAdmin(
        adminToSuspend.adminId,
        {
          accountSuspended: false,
        },
      );

      await this.auth.updateAuth(adminToSuspend.adminId, {
        disabled: false,
      });

      this.publisher.publish({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          action: "activate",
          message: `Activated / Released ${adminToSuspend.firstName} ${adminToSuspend.lastName}'s Account`,
          resource: "admins",
          adminId: adminUser.user.id,
          resourceId: adminToSuspend.id,
          previousState: adminToSuspend,
          currentState: updatedData,
        },
      });

      // TODO: Publish a release email to the admin

      res._success(StatusCodes.OK, {
        message: `${adminToSuspend.firstName} ${adminToSuspend.lastName}'s account has been activated.`,
      });
    } catch (error) {
      next(error);
    }
  };

  getKPIs: IAdminController["getKPIs"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      const kpis = await this.analyticsService.getAdminKPIs(authUser);
      res._success(StatusCodes.OK, kpis);
    } catch (error) {
      next(error);
    }
  };
}

/** AdminController instance */
export const adminController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ADMIN_CONTROLLER,
  () =>
    AdminController.factory({
      auth,
      adminService,
      departmentService,
      storageService,
      idGeneratorService,
      phoneNumberService,
      publisher,
      analyticsService,
    }),
);
