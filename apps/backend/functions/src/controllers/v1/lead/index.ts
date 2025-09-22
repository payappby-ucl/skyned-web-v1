/* eslint-disable brace-style */
/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../../enum";
import {
  IEmailService,
  ILeadController,
  IProgramService,
  ISchoolService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { emailService, programService, schoolService } from "../../../services";
import { SkynedUtils } from "../../../utils";
import { ControllerUtils } from "../utils";
import { AuthClaim } from "@workspace/shared";
import { env } from "../../../config";

/** Required dependencies to create controller instance */
export interface LeadControllerDependencies {
  schoolService: ISchoolService;
  programService: IProgramService;
  emailService: IEmailService;
}

/**
 * Concrete implementation of controller
 *
 * @class
 */

export class LeadController extends ControllerUtils implements ILeadController {
  private static instance: ILeadController | null = null;
  private constructor(
    private readonly schoolService: ISchoolService,
    private readonly programService: IProgramService,
    private readonly emailService: IEmailService,
  ) {
    super();
  }

  /**
   * Creates the controller instance
   */

  static factory({
    schoolService,
    programService,
    emailService,
  }: LeadControllerDependencies) {
    if (!LeadController.instance) {
      LeadController.instance = new LeadController(
        schoolService,
        programService,
        emailService,
      );
    }

    return LeadController.instance;
  }

  sendLeadToComms: ILeadController["sendLeadToComms"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const { program: programDetails, ...rest } = req.body;

      const school = await this.schoolService.findSchoolBySlug(
        programDetails.schoolSlug,
        {
          claim: "admin",
        } as AuthClaim,
      );

      if (!school || !school.active) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "School not found",
        );
      }

      const program = await this.programService.findProgramBySlugAndSchoolId(
        school.schoolId,
        programDetails.slug,
        {
          claim: "admin",
        } as AuthClaim,
      );

      if (!program || !program.active) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "Program not found",
        );
      }

      await this.emailService.send({
        from: {
          email: env.emails.application,
          name: "Application System",
        },
        to: [env.emails.info],
        subject: `Lead Form Submission - ${rest.firstName} ${rest.lastName}`,
        template: {
          type: "lead-collection",
          data: {
            program,
            formDetails: {
              ...rest,
              program: programDetails,
            },
          },
        },
      });

      res._success(StatusCodes.OK, {
        message: "Thanks for sharing your details, we'll get in touch with you",
      });
    } catch (error) {
      next(error);
    }
  };
}

/** Controller instance */
export const leadController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.LEAD_CONTROLLER,
  () =>
    LeadController.factory({
      schoolService,
      programService,
      emailService,
    }),
);
