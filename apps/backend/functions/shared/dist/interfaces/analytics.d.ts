import { ITimestamps } from "./utils";
export interface IKPI extends ITimestamps {
    id: number;
    date: Date;
    totalSchools: number;
    newSchools: number;
    activeSchools: number;
    schoolGrowth: number;
    totalPrograms: number;
    newPrograms: number;
    activePrograms: number;
    programGrowth: number;
    totalFaqs: number;
    newFaqs: number;
    faqGrowth: number;
    totalInquiries: number;
    newInquiries: number;
    inquiryGrowth: number;
    totalAdmins: number;
    newAdmins: number;
    activeAdmins: number;
    adminGrowth: number;
    totalPosts: number;
    publishedPosts: number;
    scheduledPosts: number;
    draftPosts: number;
    unpublishedPosts: number;
    newPosts: number;
    postGrowth: number;
}
export interface ITrends extends Omit<IKPI, "id" | "date"> {
    type: "days" | "months" | "years";
    period: string;
}
