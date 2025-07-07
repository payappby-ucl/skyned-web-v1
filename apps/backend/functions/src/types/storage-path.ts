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

export type ResolveStoragePathType = ProfileImage | SchoolImage | BlogImage;
