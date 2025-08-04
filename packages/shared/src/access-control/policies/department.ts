import { isInDepartment } from "utils";
import { AccessControlType } from "../../access-control/types";

export const departmentPolicies: AccessControlType = {
  departments: {
    list(authClaim) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return true;
    },

    read(authClaim, data) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      const department = user.departments?.find(
        (department) => department.name === data.name,
      );

      if (!isInDepartment(user, ["Executive", "Human_Resource"])) return false;
      if (department?.leadId !== user.adminId) return false;

      return true;
    },

    create() {
      return false;
    },

    update() {
      return false;
    },

    delete() {
      return false;
    },
  },
};
