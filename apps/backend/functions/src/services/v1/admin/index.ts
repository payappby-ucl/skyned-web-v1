/* eslint-disable operator-linebreak */
import { RegistryKeysEnum } from "../../../enum";
import { adminSchema } from "../../../infrastructure";
import { IAdminService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { AdminIdSchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";
import { CreateAdminServiceSchema, UpdateAdminServiceSchema } from "./schema";

/**
 * Concrete implementation of IAdminService
 *
 * @class
 */

export class AdminService extends ServiceUtils implements IAdminService {
  private static instance: IAdminService | null;
  private constructor() {
    super();
  }

  static factory() {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
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

  count: IAdminService["count"] = async () => {
    const count = await this.repository.admin.count();
    return count;
  };

  countAdminsForList: IAdminService["countAdminsForList"] = async () => {
    const count = await this.repository.admin.count();
    return count;
  };

  listAdmins: IAdminService["listAdmins"] = async (
    initiator,
    { skip, take, from, to, order, where },
  ) => {
    const admins = await this.repository.admin.findMany({
      skip,
      take,
      where: {
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },
      include: {
        departments: {
          select: {
            name: true,
            leadId: true,
          },
        },
        createdBy: {
          select: SkynedUtils.select(adminProfileKeys),
        },
        _count: {
          select: {
            departments: true,
            teams: true,
          },
        },
      },
    });

    return admins.map((admin) => this.deserialize(admin));
  };

  getAdminProfile: IAdminService["getAdminProfile"] = async (
    initiator,
    adminId: string,
  ) => {
    this.validationUtility.validateInput({
      schema: AdminIdSchema,
      inputData: {
        adminId,
      },
    });

    const admin = await this.repository.admin.findUnique({
      where: {
        adminId,
      },
      include: {
        departments: {
          select: {
            id: true,
            name: true,
            leadId: true,
          },
        },
        teams: {
          select: {
            id: true,
            name: true,
            departmentId: true,
            leadId: true,

            department: {
              select: {
                id: true,
                name: true,
                leadId: true,
              },
            },
          },
        },
      },
    });

    if (!admin) return null;

    return this.deserialize(admin);
  };

  updateAdmin: IAdminService["updateAdmin"] = async (adminId, data) => {
    this.validationUtility.validateInput({
      schema: UpdateAdminServiceSchema,
      inputData: {
        adminId,
        ...data,
      },
    });

    const admin = await this.repository.admin.update({
      where: {
        adminId,
      },

      data: {
        ...data,
      },
    });

    return this.deserialize(admin);
  };
}

export const adminService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ADMIN_SERVICE,
  () => AdminService.factory(),
);
