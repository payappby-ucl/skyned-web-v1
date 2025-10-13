import { AccessControlType } from "../../access-control/types";
import { accommodationPolicies } from "./accommodations";
import { adminPolicies } from "./admins";
import { blogPolicies } from "./blog";
import { categoryPolicies } from "./category";
import { departmentPolicies } from "./department";
import { faqPolicies } from "./faq";
import { inquiryPolicies } from "./inquiry";
import { intakePolicies } from "./intakes";
import { loanPolicies } from "./loan";
import { programPolicies } from "./programs";
import { scholarshipPolicies } from "./scholarship";
import { schoolPolicies } from "./schools";
import { tagPolicies } from "./tag";

export const policies: AccessControlType = {
  ...departmentPolicies,
  ...faqPolicies,
  ...inquiryPolicies,
  ...adminPolicies,
  ...schoolPolicies,
  ...accommodationPolicies,
  ...intakePolicies,
  ...programPolicies,
  ...blogPolicies,
  ...categoryPolicies,
  ...tagPolicies,
  ...scholarshipPolicies,
  ...loanPolicies,
};
