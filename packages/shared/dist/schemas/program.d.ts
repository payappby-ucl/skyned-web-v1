import { z } from "zod";
export declare const ProgramSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    faculty: z.ZodOptional<z.ZodString>;
    degreeType: z.ZodEnum<["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "A Level", "English as Second Language (ESL)", "1-year Post-Secondary School Certificate", "2-year Undergraduate Diploma", "3-year Undergraduate Advanced Diploma", "3-year Bachelor's Degree", "Top-Up Degree", "4-year Bachelor's Degree", "Integrated Masters", "Postgraduate Certificate", "Postgraduate Diploma", "Master's Degree"]>;
    overview: z.ZodString;
    description: z.ZodEffects<z.ZodString, string, string>;
    requirements: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    applicationFee: z.ZodNumber;
    applicationFeeDiscount: z.ZodNumber;
    tuitionFee: z.ZodNumber;
    tuitionFeeType: z.ZodEnum<["per_year", "per_semester", "full"]>;
    timeframe: z.ZodEnum<["day", "week", "month", "year"]>;
    duration: z.ZodNumber;
    minimumEducationLevel: z.ZodEnum<["primary", "secondary", "undergraduate", "postgraduate"]>;
    minimumEducationDegree: z.ZodNumber;
    minimumEligibilityGpa: z.ZodNumber;
    proficiencies: z.ZodArray<z.ZodObject<{
        test: z.ZodEnum<["ielts", "toefl", "duolingo", "pte"]>;
        score: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        test: "ielts" | "toefl" | "pte" | "duolingo";
        score: number;
    }, {
        test: "ielts" | "toefl" | "pte" | "duolingo";
        score: number;
    }>, "many">;
    pgwp: z.ZodDefault<z.ZodBoolean>;
    intakes: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    overview: string;
    description: string;
    degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
    applicationFee: number;
    applicationFeeDiscount: number;
    tuitionFee: number;
    tuitionFeeType: "per_year" | "per_semester" | "full";
    timeframe: "day" | "week" | "month" | "year";
    duration: number;
    minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
    minimumEducationDegree: number;
    minimumEligibilityGpa: number;
    proficiencies: {
        test: "ielts" | "toefl" | "pte" | "duolingo";
        score: number;
    }[];
    pgwp: boolean;
    intakes: number[];
    faculty?: string | undefined;
    requirements?: string | undefined;
}, {
    name: string;
    slug: string;
    overview: string;
    description: string;
    degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
    applicationFee: number;
    applicationFeeDiscount: number;
    tuitionFee: number;
    tuitionFeeType: "per_year" | "per_semester" | "full";
    timeframe: "day" | "week" | "month" | "year";
    duration: number;
    minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
    minimumEducationDegree: number;
    minimumEligibilityGpa: number;
    proficiencies: {
        test: "ielts" | "toefl" | "pte" | "duolingo";
        score: number;
    }[];
    intakes: number[];
    faculty?: string | undefined;
    requirements?: string | undefined;
    pgwp?: boolean | undefined;
}>;
export type ProgramSchema = z.infer<typeof ProgramSchema>;
export declare const CreateProgramSchema: z.ZodEffects<z.ZodObject<{
    type: z.ZodEnum<["single", "bulk"]>;
    data: z.ZodUnion<[z.ZodObject<{
        name: z.ZodString;
        slug: z.ZodEffects<z.ZodString, string, string>;
        faculty: z.ZodOptional<z.ZodString>;
        degreeType: z.ZodEnum<["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "A Level", "English as Second Language (ESL)", "1-year Post-Secondary School Certificate", "2-year Undergraduate Diploma", "3-year Undergraduate Advanced Diploma", "3-year Bachelor's Degree", "Top-Up Degree", "4-year Bachelor's Degree", "Integrated Masters", "Postgraduate Certificate", "Postgraduate Diploma", "Master's Degree"]>;
        overview: z.ZodString;
        description: z.ZodEffects<z.ZodString, string, string>;
        requirements: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
        applicationFee: z.ZodNumber;
        applicationFeeDiscount: z.ZodNumber;
        tuitionFee: z.ZodNumber;
        tuitionFeeType: z.ZodEnum<["per_year", "per_semester", "full"]>;
        timeframe: z.ZodEnum<["day", "week", "month", "year"]>;
        duration: z.ZodNumber;
        minimumEducationLevel: z.ZodEnum<["primary", "secondary", "undergraduate", "postgraduate"]>;
        minimumEducationDegree: z.ZodNumber;
        minimumEligibilityGpa: z.ZodNumber;
        proficiencies: z.ZodArray<z.ZodObject<{
            test: z.ZodEnum<["ielts", "toefl", "duolingo", "pte"]>;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }, {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }>, "many">;
        pgwp: z.ZodDefault<z.ZodBoolean>;
        intakes: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        pgwp: boolean;
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
    }, {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
        pgwp?: boolean | undefined;
    }>, z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        slug: z.ZodEffects<z.ZodString, string, string>;
        faculty: z.ZodOptional<z.ZodString>;
        degreeType: z.ZodEnum<["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "A Level", "English as Second Language (ESL)", "1-year Post-Secondary School Certificate", "2-year Undergraduate Diploma", "3-year Undergraduate Advanced Diploma", "3-year Bachelor's Degree", "Top-Up Degree", "4-year Bachelor's Degree", "Integrated Masters", "Postgraduate Certificate", "Postgraduate Diploma", "Master's Degree"]>;
        overview: z.ZodString;
        description: z.ZodEffects<z.ZodString, string, string>;
        requirements: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
        applicationFee: z.ZodNumber;
        applicationFeeDiscount: z.ZodNumber;
        tuitionFee: z.ZodNumber;
        tuitionFeeType: z.ZodEnum<["per_year", "per_semester", "full"]>;
        timeframe: z.ZodEnum<["day", "week", "month", "year"]>;
        duration: z.ZodNumber;
        minimumEducationLevel: z.ZodEnum<["primary", "secondary", "undergraduate", "postgraduate"]>;
        minimumEducationDegree: z.ZodNumber;
        minimumEligibilityGpa: z.ZodNumber;
        proficiencies: z.ZodArray<z.ZodObject<{
            test: z.ZodEnum<["ielts", "toefl", "duolingo", "pte"]>;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }, {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }>, "many">;
        pgwp: z.ZodDefault<z.ZodBoolean>;
        intakes: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        pgwp: boolean;
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
    }, {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
        pgwp?: boolean | undefined;
    }>, "many">]>;
}, "strip", z.ZodTypeAny, {
    type: "single" | "bulk";
    data: {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        pgwp: boolean;
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
    } | {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        pgwp: boolean;
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
    }[];
}, {
    type: "single" | "bulk";
    data: {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
        pgwp?: boolean | undefined;
    } | {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
        pgwp?: boolean | undefined;
    }[];
}>, {
    type: "single" | "bulk";
    data: {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        pgwp: boolean;
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
    } | {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        pgwp: boolean;
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
    }[];
}, {
    type: "single" | "bulk";
    data: {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
        pgwp?: boolean | undefined;
    } | {
        name: string;
        slug: string;
        overview: string;
        description: string;
        degreeType: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree";
        applicationFee: number;
        applicationFeeDiscount: number;
        tuitionFee: number;
        tuitionFeeType: "per_year" | "per_semester" | "full";
        timeframe: "day" | "week" | "month" | "year";
        duration: number;
        minimumEducationLevel: "primary" | "secondary" | "undergraduate" | "postgraduate";
        minimumEducationDegree: number;
        minimumEligibilityGpa: number;
        proficiencies: {
            test: "ielts" | "toefl" | "pte" | "duolingo";
            score: number;
        }[];
        intakes: number[];
        faculty?: string | undefined;
        requirements?: string | undefined;
        pgwp?: boolean | undefined;
    }[];
}>;
export type CreateProgramSchema = z.infer<typeof CreateProgramSchema>;
export declare const UpdateBulkProgramSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        programId: z.ZodString;
        data: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
            faculty: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            degreeType: z.ZodOptional<z.ZodEnum<["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "A Level", "English as Second Language (ESL)", "1-year Post-Secondary School Certificate", "2-year Undergraduate Diploma", "3-year Undergraduate Advanced Diploma", "3-year Bachelor's Degree", "Top-Up Degree", "4-year Bachelor's Degree", "Integrated Masters", "Postgraduate Certificate", "Postgraduate Diploma", "Master's Degree"]>>;
            overview: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
            requirements: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>>;
            applicationFee: z.ZodOptional<z.ZodNumber>;
            applicationFeeDiscount: z.ZodOptional<z.ZodNumber>;
            tuitionFee: z.ZodOptional<z.ZodNumber>;
            tuitionFeeType: z.ZodOptional<z.ZodEnum<["per_year", "per_semester", "full"]>>;
            timeframe: z.ZodOptional<z.ZodEnum<["day", "week", "month", "year"]>>;
            duration: z.ZodOptional<z.ZodNumber>;
            minimumEducationLevel: z.ZodOptional<z.ZodEnum<["primary", "secondary", "undergraduate", "postgraduate"]>>;
            minimumEducationDegree: z.ZodOptional<z.ZodNumber>;
            minimumEligibilityGpa: z.ZodOptional<z.ZodNumber>;
            proficiencies: z.ZodOptional<z.ZodArray<z.ZodObject<{
                test: z.ZodEnum<["ielts", "toefl", "duolingo", "pte"]>;
                score: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }, {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }>, "many">>;
            pgwp: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            intakes: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            slug?: string | undefined;
            overview?: string | undefined;
            description?: string | undefined;
            faculty?: string | undefined;
            degreeType?: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree" | undefined;
            requirements?: string | undefined;
            applicationFee?: number | undefined;
            applicationFeeDiscount?: number | undefined;
            tuitionFee?: number | undefined;
            tuitionFeeType?: "per_year" | "per_semester" | "full" | undefined;
            timeframe?: "day" | "week" | "month" | "year" | undefined;
            duration?: number | undefined;
            minimumEducationLevel?: "primary" | "secondary" | "undergraduate" | "postgraduate" | undefined;
            minimumEducationDegree?: number | undefined;
            minimumEligibilityGpa?: number | undefined;
            proficiencies?: {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }[] | undefined;
            pgwp?: boolean | undefined;
            intakes?: number[] | undefined;
        }, {
            name?: string | undefined;
            slug?: string | undefined;
            overview?: string | undefined;
            description?: string | undefined;
            faculty?: string | undefined;
            degreeType?: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree" | undefined;
            requirements?: string | undefined;
            applicationFee?: number | undefined;
            applicationFeeDiscount?: number | undefined;
            tuitionFee?: number | undefined;
            tuitionFeeType?: "per_year" | "per_semester" | "full" | undefined;
            timeframe?: "day" | "week" | "month" | "year" | undefined;
            duration?: number | undefined;
            minimumEducationLevel?: "primary" | "secondary" | "undergraduate" | "postgraduate" | undefined;
            minimumEducationDegree?: number | undefined;
            minimumEligibilityGpa?: number | undefined;
            proficiencies?: {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }[] | undefined;
            pgwp?: boolean | undefined;
            intakes?: number[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            name?: string | undefined;
            slug?: string | undefined;
            overview?: string | undefined;
            description?: string | undefined;
            faculty?: string | undefined;
            degreeType?: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree" | undefined;
            requirements?: string | undefined;
            applicationFee?: number | undefined;
            applicationFeeDiscount?: number | undefined;
            tuitionFee?: number | undefined;
            tuitionFeeType?: "per_year" | "per_semester" | "full" | undefined;
            timeframe?: "day" | "week" | "month" | "year" | undefined;
            duration?: number | undefined;
            minimumEducationLevel?: "primary" | "secondary" | "undergraduate" | "postgraduate" | undefined;
            minimumEducationDegree?: number | undefined;
            minimumEligibilityGpa?: number | undefined;
            proficiencies?: {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }[] | undefined;
            pgwp?: boolean | undefined;
            intakes?: number[] | undefined;
        };
        programId: string;
    }, {
        data: {
            name?: string | undefined;
            slug?: string | undefined;
            overview?: string | undefined;
            description?: string | undefined;
            faculty?: string | undefined;
            degreeType?: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree" | undefined;
            requirements?: string | undefined;
            applicationFee?: number | undefined;
            applicationFeeDiscount?: number | undefined;
            tuitionFee?: number | undefined;
            tuitionFeeType?: "per_year" | "per_semester" | "full" | undefined;
            timeframe?: "day" | "week" | "month" | "year" | undefined;
            duration?: number | undefined;
            minimumEducationLevel?: "primary" | "secondary" | "undergraduate" | "postgraduate" | undefined;
            minimumEducationDegree?: number | undefined;
            minimumEligibilityGpa?: number | undefined;
            proficiencies?: {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }[] | undefined;
            pgwp?: boolean | undefined;
            intakes?: number[] | undefined;
        };
        programId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        data: {
            name?: string | undefined;
            slug?: string | undefined;
            overview?: string | undefined;
            description?: string | undefined;
            faculty?: string | undefined;
            degreeType?: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree" | undefined;
            requirements?: string | undefined;
            applicationFee?: number | undefined;
            applicationFeeDiscount?: number | undefined;
            tuitionFee?: number | undefined;
            tuitionFeeType?: "per_year" | "per_semester" | "full" | undefined;
            timeframe?: "day" | "week" | "month" | "year" | undefined;
            duration?: number | undefined;
            minimumEducationLevel?: "primary" | "secondary" | "undergraduate" | "postgraduate" | undefined;
            minimumEducationDegree?: number | undefined;
            minimumEligibilityGpa?: number | undefined;
            proficiencies?: {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }[] | undefined;
            pgwp?: boolean | undefined;
            intakes?: number[] | undefined;
        };
        programId: string;
    }[];
}, {
    data: {
        data: {
            name?: string | undefined;
            slug?: string | undefined;
            overview?: string | undefined;
            description?: string | undefined;
            faculty?: string | undefined;
            degreeType?: "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12" | "A Level" | "English as Second Language (ESL)" | "1-year Post-Secondary School Certificate" | "2-year Undergraduate Diploma" | "3-year Undergraduate Advanced Diploma" | "3-year Bachelor's Degree" | "Top-Up Degree" | "4-year Bachelor's Degree" | "Integrated Masters" | "Postgraduate Certificate" | "Postgraduate Diploma" | "Master's Degree" | undefined;
            requirements?: string | undefined;
            applicationFee?: number | undefined;
            applicationFeeDiscount?: number | undefined;
            tuitionFee?: number | undefined;
            tuitionFeeType?: "per_year" | "per_semester" | "full" | undefined;
            timeframe?: "day" | "week" | "month" | "year" | undefined;
            duration?: number | undefined;
            minimumEducationLevel?: "primary" | "secondary" | "undergraduate" | "postgraduate" | undefined;
            minimumEducationDegree?: number | undefined;
            minimumEligibilityGpa?: number | undefined;
            proficiencies?: {
                test: "ielts" | "toefl" | "pte" | "duolingo";
                score: number;
            }[] | undefined;
            pgwp?: boolean | undefined;
            intakes?: number[] | undefined;
        };
        programId: string;
    }[];
}>;
export type UpdateBulkProgramSchema = z.infer<typeof UpdateBulkProgramSchema>;
