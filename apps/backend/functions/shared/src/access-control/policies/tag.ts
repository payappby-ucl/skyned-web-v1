import { AccessControlType } from "../../access-control/types";

export const tagPolicies: AccessControlType = {
  tags: {
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
