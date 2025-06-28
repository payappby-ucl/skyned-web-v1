import {
  degreeTypes,
  educationLevels,
  EnglishProficiency,
  timeframe,
  tuitionFeeType,
} from "../utils";
import { AdminProfile } from "./admin";
import { IIntake } from "./intake";
import { ISchool } from "./school";
import { ITimestamps } from "./utils";

export interface IProgram extends ITimestamps {
  id: number;
  programId: string;

  schoolId: string;
  school?: ISchool;

  name: string;
  slug: string;
  faculty: string;
  degreeType: (typeof degreeTypes)[keyof typeof degreeTypes];
  overview: string;
  description: string;

  applicationFee: number;
  applicationFeeDiscount: number;

  tuitionFee: number;
  tuitionFeeType: (typeof tuitionFeeType)[keyof typeof tuitionFeeType];

  timeframe: (typeof timeframe)[keyof typeof timeframe];
  duration: number;

  minimumEducationLevel: keyof typeof educationLevels;
  minimumEducationDegree: number;
  minimumEligibilityGpa: number;

  englishProficiency:
    | (typeof EnglishProficiency.examinations)[number]["name"]
    | "open";
  minimumEnglishProficiencyScore: number;

  pgwp: boolean;
  active: boolean;

  intakes: IIntake[];

  createdById: string;
  createdBy?: AdminProfile;

  _count?: {
    intakes: number;
  };
}
