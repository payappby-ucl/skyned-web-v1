import { AccessControlType } from "../../access-control/types";

export const schoolPolicies: AccessControlType = {
  schools: {
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

      return true;
    },

    create(authClaim, data) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return true;
    },

    update(authClaim, data, school) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return true;
    },

    delete(authClaim, school) {
      return false;
    },
  },
};
