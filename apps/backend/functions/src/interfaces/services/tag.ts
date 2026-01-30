import { AuthClaim, ITag } from "@workspace/shared";
import { IQueryConstruct } from "../utils";
import { TagQuerySchema } from "../../zod-schemas";

/** Represents tags service */
export interface ITagService {
  /** Deletes a single tag */
  deleteTag(id: number): Promise<ITag>;

  /** Deletes multiple tags */
  deleteTags(ids: number[]): Promise<void>;

  /** Get all Tags in database */
  getAllTags(
    query?: Partial<{ ids: number[] }>,
    authUser?: AuthClaim,
  ): Promise<ITag[]>;

  /** Find Tags by filter */
  findTags(
    query: Partial<IQueryConstruct<TagQuerySchema>>,
    authUser?: AuthClaim,
  ): Promise<ITag[]>;

  /** Counts Tags by filter */
  count(query: Partial<IQueryConstruct<TagQuerySchema>>): Promise<number>;

  /** Finds Tag by id */
  findById(id: number): Promise<ITag | null>;
}
