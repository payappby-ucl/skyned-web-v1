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

export type ResolveStoragePathType = ProfileImage | SchoolImage;
