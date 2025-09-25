import { degreeTypes, educationLevels, EnglishProficiency, financialAids, timeframe, tuitionFeeType } from "../utils";
import { AdminProfile } from "./admin";
import { IIntake } from "./intake";
import { ISchool } from "./school";
import { ITimestamps } from "./utils";
export interface IProficiency {
    test: (typeof EnglishProficiency.examinations)[number]["name"];
    score: number;
    programId: string;
}
export interface IProgram extends ITimestamps {
    id: number;
    programId: string;
    schoolId: string;
    school?: ISchool;
    name: string;
    slug: string;
    faculty: string;
    degreeType: (typeof degreeTypes)[number];
    overview: string;
    description: string;
    requirements?: string;
    financialAids: (typeof financialAids)[number][];
    applicationFee: number;
    applicationFeeDiscount: number;
    tuitionFee: number;
    tuitionFeeType: (typeof tuitionFeeType)[number];
    timeframe: (typeof timeframe)[number];
    duration: number;
    minimumEducationLevel: keyof typeof educationLevels;
    minimumEducationDegree: number;
    minimumEligibilityGpa: number;
    pgwp: boolean;
    active: boolean;
    intakes: IIntake[];
    proficiencies: IProficiency[];
    createdById: string;
    createdBy?: AdminProfile;
}
