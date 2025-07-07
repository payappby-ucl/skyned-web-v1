import { blogPostStatus } from "../utils";
import { AdminProfile } from "./admin";
import { IObject, ITimestamps } from "./utils";
export interface ITag extends ITimestamps {
    id: number;
    name: string;
    posts: IBlogPost[];
    createdById: string;
    createdBy?: AdminProfile;
}
export interface ICategory extends ITimestamps {
    id: number;
    name: string;
    posts: IBlogPost[];
    createdById: string;
    createdBy?: AdminProfile;
}
export interface IBlogPost extends ITimestamps {
    id: number;
    blogPostId: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: IObject;
    featured: boolean;
    status: (typeof blogPostStatus)[number];
    publishedAt?: ITimestamps["createdAt"];
    categories: ICategory[];
    tags: ITag[];
    authorId: string;
    author?: AdminProfile;
}
