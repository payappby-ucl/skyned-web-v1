import { AccessControlType } from "../../access-control/types";

// ? Note that data is single or an array

export const programPolicies: AccessControlType = {
  programs: {
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

      return true;
    },

    update(authClaim, data, school) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return true;
    },

    delete(authClaim, school) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      return false;
    },
  },
};
