import { AccessControlType } from "../../access-control/types";

export const categoryPolicies: AccessControlType = {
  categories: {
    list(authClaim) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return true;
    },

    delete(authClaim, school) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return true;
    },
  },
};
