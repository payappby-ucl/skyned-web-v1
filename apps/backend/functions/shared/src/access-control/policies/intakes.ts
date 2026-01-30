import { AccessControlType } from "../../access-control/types";

export const intakePolicies: AccessControlType = {
  intakes: {
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
