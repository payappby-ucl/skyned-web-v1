import { AccessControlType } from "../../access-control/types";
import { isInDepartment, department } from "../../utils";

export const faqPolicies: AccessControlType = {
  faqs: {
    list() {
      return true;
    },
    read(authClaim) {
      if (!authClaim) return false;
      if (authClaim.claim !== "admin") return false;
      return true;
    },

    create(authClaim, data) {
      if (!authClaim) return false;
      if (authClaim.claim !== "admin") return false;
      return isInDepartment(authClaim.user, [department.Executive]);
    },

    update(authClaim, data) {
      if (!authClaim) return false;
      if (authClaim.claim !== "admin") return false;
      return isInDepartment(authClaim.user, [department.Executive]);
    },

    delete(authClaim, data) {
      if (!authClaim) return false;
      if (authClaim.claim !== "admin") return false;
      return isInDepartment(authClaim.user, [department.Executive]);
    },
  },
};
