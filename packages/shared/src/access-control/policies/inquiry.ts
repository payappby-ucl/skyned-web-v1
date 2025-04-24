import { AccessControlType } from "../../access-control/types";
import { isInDepartment, department } from "../../utils";

export const inquiryPolicies: AccessControlType = {
  inquiries: {
    list(authClaim) {
      if (authClaim.claim !== "admin") return false;
      return true;
    },
    read(authClaim) {
      if (authClaim.claim !== "admin") return false;
      return true;
    },

    create(authClaim) {
      if (authClaim.claim === "admin") return false;
      return true;
    },

    update() {
      return false;
    },

    delete(authClaim) {
      if (authClaim.claim !== "admin") return false;

      const executiveDepartment = authClaim.user.departments?.find(
        (dpt) => dpt.name === department.Executive,
      );

      if (!executiveDepartment) return false;
      return (
        isInDepartment(authClaim.user, [department.Executive]) &&
        authClaim.user.adminId === executiveDepartment.leadId
      );
    },
  },
};
