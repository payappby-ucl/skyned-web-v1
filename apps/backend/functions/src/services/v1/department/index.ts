/* eslint-disable max-len */
/* eslint-disable brace-style */
import { department } from "@workspace/shared";
import { IDepartmentService } from "../../../interfaces";
import { ServiceUtils } from "../utils";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { DepartmentIdsSchema } from "./schema";

/**
 * Concrete implementation of {IDepartmentService}
 * @class
 */

export class DepartmentService
  extends ServiceUtils
  implements IDepartmentService
{
  private static instance: IDepartmentService | null = null;
  private constructor() {
    super();
  }
  static factory() {
    if (!DepartmentService.instance) {
      DepartmentService.instance = new DepartmentService();
    }

    return DepartmentService.instance;
  }

  /** Gets list of departments */

  getDepartments: IDepartmentService["getDepartments"] = (user) => {
    const isExecutiveMember = this.isExecutiveMember(user);

    return this.repository.department.getDepartments({
      where: {
        name: !isExecutiveMember ? { not: department.Executive } : undefined,
      },
      include: {
        lead: {
          select: SkynedUtils.select(adminProfileKeys),
        },
        members: {
          include: {
            _count: true,
          },
        },
        teams: {
          include: {
            _count: true,
          },
        },
      },
    });
  };

  /** Gets list of departments with only details for admin creation */

  getDepartmentsForAdminCreation: IDepartmentService["getDepartmentsForAdminCreation"] =
    (user) => {
      const isExecutiveMember = this.isExecutiveMember(user);

      return this.repository.department.getDepartments({
        where: {
          name: !isExecutiveMember ? { not: department.Executive } : undefined,
        },
        select: {
          id: true,
          name: true,
        },
      });
    };

  fetchDepartmentsInArrayListWithIds: IDepartmentService["fetchDepartmentsInArrayListWithIds"] =
    async (ids) => {
      this.validationUtility.validateInput({
        schema: DepartmentIdsSchema,
        inputData: {
          ids,
        },
      });

      const departments = await this.repository.department.getDepartments({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return departments;
    };

  getDepartmentsForNavigation: IDepartmentService["getDepartmentsForNavigation"] =
    async () => {
      const departments = await this.repository.db.department.findMany({
        select: {
          name: true,
          leadId: true,

          lead: {
            select: SkynedUtils.select(adminProfileKeys),
          },

          _count: {
            select: {
              members: true,
              teams: true,
            },
          },
        },
      });

      return departments.map((department) => this.deserialize(department));
    };
}

/** Instance of {DepartmentService} */
export const departmentService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.DEPARTMENT_SERVICE,
  () => DepartmentService.factory(),
);
