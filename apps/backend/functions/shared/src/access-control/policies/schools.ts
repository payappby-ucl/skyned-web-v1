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
      return true;
    },

    create() {
      return true;
    },

    update() {
      return true;
    },

    delete() {
      return true;
    },
  },
};
