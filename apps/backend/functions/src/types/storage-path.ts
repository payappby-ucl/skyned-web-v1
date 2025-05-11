interface ProfileImage {
  type: "primaryImage" | "secondaryImage";
  data: {
    adminId: string;
  };
}

export type ResolveStoragePathType = ProfileImage;
