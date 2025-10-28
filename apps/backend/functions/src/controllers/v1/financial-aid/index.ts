/* eslint-disable brace-style */
/* eslint-disable max-len */
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import {
  IFinancialAidController,
  IFinancialAidService,
  IIDGeneratorService,
  IPhoneNumberService,
  IProgramService,
  ISchoolService,
  IStorageService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import {
  financialAidService,
  idGeneratorService,
  phoneNumberService,
  programService,
  schoolService,
  storageService,
} from "../../../services";
import { ControllerUtils } from "../utils";
import { IPublisher, publisher } from "../../../publisher";
import { StatusCodes } from "http-status-codes";
import { AuthClaim, computeFinancialAidEligibility } from "@workspace/shared";
import { SkynedUtils } from "../../../utils";
import { env } from "../../../config";

const imageKeys = [
  "bankStatement",
  "transcript",
  "proofOfAddress",
  "identification",
  "immigrationDocument",
  "resume",
  "offerLetter",
] as const;

/** Required dependencies to create Controller instance */
export interface FinancialAidControllerDependencies {
  phoneNumberService: IPhoneNumberService;
  publisher: IPublisher;
  programService: IProgramService;
  schoolService: ISchoolService;
  storageService: IStorageService;
  idGeneratorService: IIDGeneratorService;
  financialAidService: IFinancialAidService;
}

/**
 * Concrete implementation for Contact us controller
 *
 * @class
 */

export class FinancialAidController
  extends ControllerUtils
  implements IFinancialAidController
{
  private static instance: IFinancialAidController | null = null;
  private constructor(
    private readonly phoneNumberService: IPhoneNumberService,
    private readonly publisher: IPublisher,
    private readonly programService: IProgramService,
    private readonly schoolService: ISchoolService,
    private readonly storageService: IStorageService,
    private readonly idGeneratorService: IIDGeneratorService,
    private readonly financialAidService: IFinancialAidService,
  ) {
    super();
  }

  create: IFinancialAidController["create"] = async (req, res, next) => {
    try {
      const { schoolSlug, programSlug, phoneNumber, nextSchoolTerm } = req.body;

      if (!this.phoneNumberService.isValidPhoneNumber(phoneNumber)) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Please enter a valid phone number",
        );
      }

      const school = await this.schoolService.findSchoolBySlug(schoolSlug, {
        claim: "admin",
      } as AuthClaim);

      if (!school) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Sorry Your selected school cannot be found",
        );
      }

      const program = await this.programService.findProgramBySlugAndSchoolId(
        school.schoolId,
        programSlug,
        {
          claim: "admin",
        } as AuthClaim,
      );

      if (!program) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Sorry Your selected program cannot be found",
        );
      }

      const check = computeFinancialAidEligibility(program, req.body);
      if (!check.isEligible) {
        throw SkynedUtils.createException(
          StatusCodes.BAD_REQUEST,
          "Sorry you're not eligible for the selected program",
        );
      }

      const keys: (typeof imageKeys)[number][] = [];

      imageKeys.forEach((key) => {
        if (req.body[key]) {
          keys.push(key);
        }
      });

      const financialAidId = this.idGeneratorService.id();
      const promises = keys.map((key) =>
        this.storageService.saveObject(
          req.body[key]!,
          SkynedUtils.resolveStoragePath({
            type: "financial-aid",
            data: {
              financialAidId,
              key,
            },
          }),
        ),
      );

      const storageResponses = await Promise.all(promises);
      const images = keys.reduce(
        (accumulator, current, index) => {
          accumulator[current] = storageResponses[index];
          return accumulator;
        },
        {} as Record<
          (typeof keys)[number],
          Awaited<ReturnType<IStorageService["saveObject"]>>
        >,
      );

      const financialAid = await this.financialAidService.create({
        financialAidId,
        ...SkynedUtils.exclude(req.body, [
          "bankStatement",
          "immigrationDocument",
          "transcript",
          "resume",
          "proofOfAddress",
          "identification",
          "offerLetter",
          "nextSchoolTerm",
          "phoneNumber",
        ]),
        nextSchoolTerm: new Date(nextSchoolTerm),
        phoneNumber: this.phoneNumberService.formatPhoneNumber(phoneNumber),
        ...images,
        programId: program.programId,
      });

      // * Emit Send mail
      this.publisher.publish({
        type: EventsEnum.SEND_EMAIL_EVENT,
        data: {
          from: {
            email: env.emails.info,
          },
          to: [env.emails.info],
          subject: "New Financial Aid Submission",
          template: {
            type: "financial-aid",
            data: {
              school,
              program,
              data: financialAid,
            },
          },
          attachments: keys.map((key) => ({
            filename: `${key}.pdf`,
            content: req.body[key]!.split(",")[1],
            contentType: "text/plain",
            encoding: "base64",
          })),
        },
      });

      res._success(StatusCodes.CREATED, {
        message: "Your message have been received, we'll respond to you soon.",
      });
    } catch (error) {
      next(error);
    }
  };

  getFinancialAids: IFinancialAidController["getFinancialAids"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);

      this._attributeBasedAccessControl(authUser, "loans", "list");

      const { limit, page, from, to } = req.query;

      const construct = this._constructPaginationData({
        limit,
        page,
      });

      const total = await this.financialAidService.count({
        from,
        to,
      });

      const financialAids = await this.financialAidService.findMany({
        ...SkynedUtils.pick(construct, ["skip", "take"]),
        from,
        to,
      });

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        data: financialAids,
        total,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Creates the FinancialAidController instance
   */

  static factory({
    phoneNumberService,
    publisher,
    programService,
    schoolService,
    storageService,
    idGeneratorService,
    financialAidService,
  }: FinancialAidControllerDependencies) {
    if (!FinancialAidController.instance) {
      FinancialAidController.instance = new FinancialAidController(
        phoneNumberService,
        publisher,
        programService,
        schoolService,
        storageService,
        idGeneratorService,
        financialAidService,
      );
    }

    return FinancialAidController.instance;
  }
}

/** FinancialAidController instance */
export const financialAidController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FINANCIAL_AID_CONTROLLER,
  () =>
    FinancialAidController.factory({
      phoneNumberService,
      publisher,
      programService,
      schoolService,
      storageService,
      idGeneratorService,
      financialAidService,
    }),
);
