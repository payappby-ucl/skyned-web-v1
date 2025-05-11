import { IRepository, IValidationUtility } from "../../../interfaces";
import { IAdminRepository } from "./interface";
import { adminSchema } from "./schema";
import { DBUtils } from "../utils";
import { Prisma } from "../prisma-client";
import { DefaultArgs } from "../prisma-client/runtime/library";
import { IAdmin } from "@workspace/shared";

export * from "./interface";
export * from "./schema";

/**
 * Concrete implementation of {IAdminRepository}
 *
 * @class
 */

export class AdminRepository extends DBUtils implements IAdminRepository {
  constructor(
    private readonly db: IRepository["db"],
    private readonly validationUtility: IValidationUtility,
  ) {
    super();
  }

  private accessControlSelect(initiator: IAdmin | "auth"): {
    select: Prisma.AdminSelect<DefaultArgs> | null | undefined;
    include: Prisma.AdminInclude<DefaultArgs> | null | undefined;
  } {
    if (initiator === "auth") {
      return {
        select: undefined,
        include: {
          departments: true,
          teams: true,
        },
      };
    }

    return {
      select: undefined,
      include: undefined,
    };
  }

  /**
   * Finds admin by the admin Id
   */

  findAdminByAdminId: IAdminRepository["findAdminByAdminId"] = async (
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
      message: "AdminId is invalid",
    });

    const admin = await this.db.admin.findUnique({
      where: {
        adminId,
      },
      ...(initiator ? this.accessControlSelect(initiator) : {}),
    });

    if (!admin) return null;

    return this.deserialize(admin);
  };

  create: IAdminRepository["create"] = (options) => {
    return this.db.admin.create(options);
  };
}
