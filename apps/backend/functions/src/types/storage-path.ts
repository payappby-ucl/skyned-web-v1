interface ProfileImage {
  type: "primaryImage" | "secondaryImage";
  data: {
    adminId: string;
  };
}

interface SchoolImage {
  type: "logo" | "schoolImage";
  data: {
    schoolId: string;
  };
}

interface BlogImage {
  type: "coverImage";
  data: {
    blogPostId: string;
  };
}

interface ScholarshipBanner {
  type: "banner";
  data: {
    slug: string;
  };
}

interface FinancialAid {
  type: "financial-aid";
  data: {
    financialAidId: string;
    key:
      | "bankStatement"
      | "transcript"
      | "proofOfAddress"
      | "identification"
      | "immigrationDocument"
      | "resume";
  };
}

export type ResolveStoragePathType =
  | ProfileImage
  | SchoolImage
  | BlogImage
  | ScholarshipBanner
  | FinancialAid;
