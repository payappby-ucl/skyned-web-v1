import { IFaq } from "@workspace/shared";

/** Representation of FAQ Repository */
export interface IFaqRepository {
  create(
    data: Pick<IFaq, "answer" | "question" | "createdById">,
  ): Promise<IFaq>;
}
