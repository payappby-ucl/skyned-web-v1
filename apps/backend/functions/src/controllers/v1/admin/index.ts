/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
import { StatusCodes } from "http-status-codes";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import {
  IAdminController,
  IAdminService,
  IAuth,
  IDepartmentService,
  IEvents,
  IIDGeneratorService,
  IPhoneNumberService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ControllerUtils } from "../utils";
import {
  adminService,
  departmentService,
  idGeneratorService,
  phoneNumberService,
  storageService,
} from "../../../services";
import { auth, events } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";
import { env } from "../../../config";

/** Required dependencies to create AdminController instance */
export interface AdminControllerDependencies {
  auth: IAuth;
  adminService: IAdminService;
  departmentService: IDepartmentService;
  storageService: IStorageService;
  idGeneratorService: IIDGeneratorService;
  phoneNumberService: IPhoneNumberService;
  events: IEvents;
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
    private readonly events: IEvents,
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
    events,
  }: AdminControllerDependencies) {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController(
        auth,
        adminService,
        departmentService,
        storageService,
        idGeneratorService,
        phoneNumberService,
        events,
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
          `${body.email} is already any existing account.`,
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
        this.events.emitEvent({
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
      events,
    }),
);
