import { ITimestamps } from "./utils";

export interface IKPI extends ITimestamps {
  id: number;
  date: Date;

  // Schools
  totalSchools: number;
  newSchools: number;
  activeSchools: number;
  schoolGrowth: number;

  // Programs
  totalPrograms: number;
  newPrograms: number;
  activePrograms: number;
  programGrowth: number;

  // FAQs
  totalFaqs: number;
  newFaqs: number;
  faqGrowth: number;

  // Inquiries
  totalInquiries: number;
  newInquiries: number;
  inquiryGrowth: number;

  // Admins
  totalAdmins: number;
  newAdmins: number;
  activeAdmins: number;
  adminGrowth: number;

  // Blogs
  totalPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
  draftPosts: number;
  unpublishedPosts: number;
  newPosts: number;
  postGrowth: number;
}
