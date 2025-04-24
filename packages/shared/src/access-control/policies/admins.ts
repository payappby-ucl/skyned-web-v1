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
      return true;
    },

    update(authClaim, data) {
      return true;
    },

    create(authClaim, data) {
      return true;
    },

    delete() {
      return false;
    },
  },
};
