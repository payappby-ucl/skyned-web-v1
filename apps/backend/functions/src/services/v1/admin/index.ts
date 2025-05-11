import { RegistryKeysEnum } from "../../../enum";
import { adminSchema, repository } from "../../../infrastructure";
import {
  IAdminService,
  IRepository,
  IValidationUtility,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { validationUtility } from "../../../utils";
import { ServiceUtils } from "../utils";
import { CreateAdminServiceSchema } from "./schema";

/** Represents dependencies needed to initialize concrete IAdminService */
export interface IAdminServiceDependencies {
  /** Database object */
  repository: IRepository;
  /** Validation object */
  validationUtility: IValidationUtility;
}

/**
 * Concrete implementation of IAdminService
 *
 * @class
 */

export class AdminService extends ServiceUtils implements IAdminService {
  private static instance: IAdminService | null;
  private constructor(
    private readonly repository: IRepository,
    private readonly validationUtility: IValidationUtility,
  ) {
    super();
  }

  static factory({ repository, validationUtility }: IAdminServiceDependencies) {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService(repository, validationUtility);
    }

    return AdminService.instance;
  }

  findAdminByAdminId: IAdminService["findAdminByAdminId"] = async (
    adminId,
    initiator,
  ) => {
    this.validationUtility.validateInput({
      schema: adminSchema.pick({
        adminId: true,
      }),
      inputData: {
        adminId,
      },
    });

    const admin = await this.repository.admin.findAdminByAdminId(
      adminId,
      initiator,
    );
    return admin;
  };

  createAdmin: IAdminService["createAdmin"] = async (data, departments) => {
    this.validationUtility.validateInput({
      schema: CreateAdminServiceSchema,
      inputData: {
        ...data,
        departments,
      },
    });

    const admin = await this.repository.admin.create({
      data: {
        ...data,
        departments: {
          connect: departments.map((id) => ({
            id,
          })),
        },
      },
    });

    return this.deserialize(admin);
  };
}

export const adminService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ADMIN_SERVICE,
  () =>
    AdminService.factory({
      repository,
      validationUtility,
    }),
);
