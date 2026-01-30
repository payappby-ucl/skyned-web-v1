import { AuthClaim, ICategory } from "@workspace/shared";
import { IQueryConstruct } from "../utils";
import { CategoryQuerySchema } from "../../zod-schemas";

/** Represents categories service */
export interface ICategoryService {
  /** Deletes a single category */
  deleteCategory(id: number): Promise<ICategory>;

  /** Deletes multiple categories */
  deleteCategories(ids: number[]): Promise<void>;

  /** Get all categories in database */
  getAllCategories(
    query?: Partial<{ ids: number[] }>,
    authUser?: AuthClaim,
  ): Promise<ICategory[]>;

  /** Find categories by filter */
  findCategories(
    query: Partial<IQueryConstruct<CategoryQuerySchema>>,
    authUser?: AuthClaim,
  ): Promise<ICategory[]>;

  /** Counts categories by filter */
  count(query: Partial<IQueryConstruct<CategoryQuerySchema>>): Promise<number>;

  /** Finds category by id */
  findById(id: number): Promise<ICategory | null>;
}
