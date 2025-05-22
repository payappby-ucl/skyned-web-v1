/* eslint-disable max-len */

import {
  IAccommodationRepository,
  IAdminRepository,
  IDepartmentRepository,
  IFaqRepository,
  IIntakeRepository,
  ISchoolRepository,
  ITokenRepository,
} from "../../../infrastructure";
import { IActivityLogRepository } from "../../../infrastructure/repository/activity-log";
import { IInquiryRepository } from "../../../infrastructure/repository/inquiry";
import {
  Prisma,
  PrismaClient,
} from "../../../infrastructure/repository/prisma-client";
import { DefaultArgs } from "../../../infrastructure/repository/prisma-client/runtime/library";

/** Database interface representation */
export interface IRepository {
  /** DB - This is in a case i need to use transactions - Tightly coupled to prisma and postgres DB */
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  token: ITokenRepository;
  admin: IAdminRepository;
  inquiry: IInquiryRepository;
  activityLog: IActivityLogRepository;
  faq: IFaqRepository;
  department: IDepartmentRepository;
  school: ISchoolRepository;
  accommodation: IAccommodationRepository;
  intake: IIntakeRepository;
}
