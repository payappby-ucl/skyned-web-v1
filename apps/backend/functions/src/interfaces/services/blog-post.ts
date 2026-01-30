import { AuthClaim, IBlogPost } from "@workspace/shared";
import { IQueryConstruct } from "../utils";
import { BlogPostQuerySchema } from "../../zod-schemas";

/** Represents blog posts service */
export interface IBlogPostService {
  /** Creates a blog post */
  createBlogPost(
    data: Pick<
      IBlogPost,
      | "blogPostId"
      | "content"
      | "slug"
      | "title"
      | "status"
      | "publishedAt"
      | "featured"
      | "authorId"
      | "coverImage"
      | "excerpt"
    > & {
      categories: string[];
      tags: string[];
    },
  ): Promise<IBlogPost>;

  /** Updates a blog post */
  updateBlogPost(
    id: number,
    adminId: string,
    data: Partial<
      Pick<
        IBlogPost,
        | "content"
        | "slug"
        | "title"
        | "status"
        | "featured"
        | "excerpt"
        | "coverImage"
      > & {
        publishedAt?: Date | null;
        categories: string[];
        tags: string[];
      }
    >,
  ): Promise<IBlogPost>;

  /** Finds a blog post by slug name */
  findBlogPostBySlug(
    slug: string,
    authUser?: AuthClaim,
  ): Promise<IBlogPost | null>;

  /** Deletes a blog post */
  deleteBlogPost(slug: string): Promise<IBlogPost>;

  /** Find blog posts */
  findBlogPosts(
    query: Partial<IQueryConstruct<BlogPostQuerySchema>>,
    authUser?: AuthClaim,
  ): Promise<IBlogPost[]>;

  /** Counts Blog posts */
  count(
    query: Partial<IQueryConstruct<BlogPostQuerySchema>>,
    authUser?: AuthClaim,
  ): Promise<number>;

  /** Finds all posts due to publish */
  findAllPostsDueToPublish(): Promise<IBlogPost[]>;

  /** Publish posts */
  publishPosts(ids: number[]): Promise<void>;
}
