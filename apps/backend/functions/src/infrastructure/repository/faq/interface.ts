import { IFaq } from "@workspace/shared";
import { Prisma } from "../prisma-client";

/** Representation of FAQ Repository */
export interface IFaqRepository {
  create(
    data: Pick<IFaq, "answer" | "question" | "createdById">,
  ): Promise<IFaq>;

  /** Gets faqs */
  findMany(query?: Prisma.FaqFindManyArgs): Promise<IFaq[]>;

  /** Count */
  count(query?: Prisma.FaqCountArgs): Promise<number>;

  /** Delete data */
  delete(id: number): Promise<IFaq>;

  /** Find an faq by id */
  findById(id: number): Promise<IFaq | null>;
}
