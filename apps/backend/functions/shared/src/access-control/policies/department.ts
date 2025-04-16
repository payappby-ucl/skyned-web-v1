import { AccessControlType } from "access-control/types";

export const departmentPolicies: AccessControlType = {
  departments: {
    list({ claim, user }) {
      if (claim === "student") return false;
      return true;
    },
    read({ claim, user }, data) {
      return true;
    },

    create({ claim, user }, data) {
      return true;
    },
  },
};
