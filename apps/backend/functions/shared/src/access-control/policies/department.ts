import { AccessControlType } from "access-control/types";

export const departmentPolicies: AccessControlType = {
  departments: {
    list(authClaim) {
      if (!authClaim) return false;

      const { claim, user } = authClaim;
      if (claim === "student") return false;

      return true;
    },
    read(authClaim, data) {
      return true;
    },

    create(authClaim, data) {
      return true;
    },
  },
};
