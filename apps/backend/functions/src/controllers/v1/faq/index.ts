import { StatusCodes } from "http-status-codes";
import { IEvents, IFaqController, IFaqService } from "../../../interfaces";
import { ControllerUtils } from "../utils";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import SkynedRegistry from "../../../registry";
import { faqService } from "../../../services";
import { events } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";

export interface IFaqControllerDependencies {
  faqService: IFaqService;
  event: IEvents;
}
export class FaqController extends ControllerUtils implements IFaqController {
  private static instance: IFaqController | null = null;

  private constructor(
    private readonly faqService: IFaqService,
    private readonly event: IEvents,
  ) {
    super();
  }

  static factory({ faqService, event }: IFaqControllerDependencies) {
    if (!FaqController.instance) {
      FaqController.instance = new FaqController(faqService, event);
    }

    return FaqController.instance;
  }

  createFaq: IFaqController["createFaq"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);
      const data = req.body;

      this._attributeBasedAccessControl(authUser, "faqs", "create", data);

      const faq = await this.faqService.create({
        ...data,
        createdById: authUser.user.adminId,
      });

      this.event.emitEvent({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "faqs",
          resourceId: faq.id,
          action: "create",
          currentState: SkynedUtils.exclude(faq, ["createdBy"]),
          adminId: authUser.user.id,
        },
      });

      res._success(StatusCodes.CREATED, faq);
    } catch (error) {
      next(error);
    }
  };

  getFaqs: IFaqController["getFaqs"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);

      this._attributeBasedAccessControl(authUser, "faqs", "list");

      const { limit, page, from, to } = req.query;

      const construct = this._constructPaginationData({
        limit,
        page,
      });

      const total = await this.faqService.count({
        from,
        to,
      });

      const faqs = await this.faqService.findMany({
        ...SkynedUtils.pick(construct, ["skip", "take"]),
        from,
        to,
      });

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        data: faqs,
        total,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteFaq: IFaqController["deleteFaq"] = async (req, res, next) => {
    try {
      const authUser = this._validateAdmin(req);

      const { id } = req.params;
      const faq = await this.faqService.findById(id);

      if (!faq) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "The resource you're trying to delete does not exist.",
        );
      }

      this._attributeBasedAccessControl(authUser, "faqs", "delete", faq);

      await this.faqService.delete(faq.id);

      this.event.emitEvent({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "faqs",
          resourceId: faq.id,
          action: "delete",
          previousState: SkynedUtils.exclude(faq, ["createdBy"]),
          adminId: authUser.user.id,
        },
      });

      res._success(StatusCodes.OK, {
        message: "Resource Deleted",
      });
    } catch (error) {
      next(error);
    }
  };

  listFaqs: IFaqController["listFaqs"] = async (req, res, next) => {
    try {
      const faqs = await this.faqService.findMany();
      res._success(StatusCodes.OK, faqs);
    } catch (error) {
      next(error);
    }
  };
}

/** {FaqController} instance */
export const faqController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FAQ_CONTROLLER,
  () =>
    FaqController.factory({
      faqService,
      event: events,
    }),
);
