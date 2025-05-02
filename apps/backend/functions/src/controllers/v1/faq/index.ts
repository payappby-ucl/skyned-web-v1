import { StatusCodes } from "http-status-codes";
import { IEvents, IFaqController, IFaqService } from "../../../interfaces";
import { ControllerUtils } from "../utils";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import SkynedRegistry from "../../../registry";
import { faqService } from "../../../services";
import { events } from "../../../infrastructure";

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
          currentState: faq,
          adminId: authUser.user.id,
        },
      });

      res._success(StatusCodes.CREATED, faq);
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
