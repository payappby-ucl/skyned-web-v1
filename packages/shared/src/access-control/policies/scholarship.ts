import { department, isInDepartment } from "../../utils";
import { AccessControlType } from "../../access-control/types";

export const scholarshipPolicies: AccessControlType = {
  scholarships: {
    list() {
      return true;
    },

    read() {
      return true;
    },

    create(authClaim, data) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;
      return isInDepartment(user, [department.Executive, department.Marketing]);
    },

    update(authClaim, data, scholarship) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;
      return isInDepartment(user, [department.Executive, department.Marketing]);
    },

    delete(authClaim, scholarship) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;
      return isInDepartment(user, [department.Executive, department.Marketing]);
    },
  },
};
