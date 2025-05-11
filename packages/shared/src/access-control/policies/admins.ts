import { AccessControlType } from "../../access-control/types";
import { department, isInDepartment } from "../../utils";

export const adminPolicies: AccessControlType = {
  admins: {
    list(authClaim) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;
      return isInDepartment(user, [department.Executive]);
    },
    read(authClaim, data) {
      return false;
    },

    update(authClaim, data) {
      return false;
    },

    create(authClaim, data) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      const hasExecutiveDepartment = !!data?.departments?.find(
        (dep) => dep.name === department.Executive,
      );

      const executiveDepartment = user.departments?.find(
        (dep) => dep.name === department.Executive,
      );

      if (
        hasExecutiveDepartment &&
        (!executiveDepartment || executiveDepartment.leadId !== user.adminId)
      ) {
        return false;
      }

      if (
        !isInDepartment(user, [department.Executive, department.Human_Resource])
      ) {
        return false;
      }

      return true;
    },

    delete() {
      return false;
    },
  },
};
