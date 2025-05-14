import { AccessControlType } from "../../access-control/types";
import { department, isInDepartment } from "../../utils";

export const adminPolicies: AccessControlType = {
  admins: {
    list(authClaim) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;
      return isInDepartment(user, [
        department.Executive,
        department.Human_Resource,
      ]);
    },
    read(authClaim, data) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;
      if (!data) return false;

      return isInDepartment(user, [
        department.Executive,
        department.Human_Resource,
      ]);
    },

    update(authClaim, data, beneficiary) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      if (
        !isInDepartment(user, [department.Human_Resource, department.Executive])
      ) {
        return false;
      }

      if (isInDepartment(beneficiary, [department.Executive])) {
        const executiveDepartment = beneficiary.departments?.find(
          (dep) => dep.name === department.Executive,
        );

        if (!isInDepartment(user, [department.Executive])) return false;
        if (executiveDepartment?.leadId !== user.adminId) return false;
      } else {
        if (isInDepartment(beneficiary, [department.Human_Resource])) {
          if (user.adminId === beneficiary.adminId) return false;

          if (
            isInDepartment(user, [department.Human_Resource]) &&
            beneficiary.departments?.find(
              (dep) => dep.name === department.Human_Resource,
            )?.leadId !== user.adminId
          ) {
            return false;
          }
        }
      }

      // TODO: Work here on data been sent

      return true;
    },

    create(authClaim, data) {
      if (!authClaim) return false;
      const { claim, user } = authClaim;
      if (claim !== "admin") return false;

      const hasExecutiveDepartment = !!data?.departments?.find(
        (dep) => dep.name === department.Executive,
      );

      const executiveDepartment = user.departments?.find(
        (dep) => dep.name === department.Executive,
      );

      if (
        hasExecutiveDepartment &&
        (!executiveDepartment || executiveDepartment.leadId !== user.adminId)
      ) {
        return false;
      }

      if (
        !isInDepartment(user, [department.Executive, department.Human_Resource])
      ) {
        return false;
      }

      return true;
    },

    delete() {
      return false;
    },
  },
};
