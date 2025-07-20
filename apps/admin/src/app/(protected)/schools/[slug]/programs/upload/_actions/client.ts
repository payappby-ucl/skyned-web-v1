"use client";

import { brandClientApi } from "@/src/lib/client";
import { DEFAULT_BULK_UPLOAD_WORKSHEET_NAME } from "@/src/utils";
import {
  degreeTypes,
  educationLevels,
  IIntake,
  ISchool,
  timeframe,
  tuitionFeeType,
} from "@workspace/shared";
import ExcelJs from "exceljs";

interface Props {
  creator: string;
  intakes: IIntake[];
  school: ISchool;
}
export async function generateProgramUploadTemplate({
  creator,
  school,
  intakes,
}: Props) {
  // * Workbook Operations
  const workbook = new ExcelJs.Workbook();
  workbook.title = "Bulk Program Upload Template";
  workbook.description =
    "A template for mass program creation designed specifically to suit Skyned Consults platform";
  workbook.creator = creator;
  workbook.created = new Date();

  // * Worksheet Operations
  const worksheet = workbook.addWorksheet(DEFAULT_BULK_UPLOAD_WORKSHEET_NAME);

  const added = 2;
  //  * Add Columns
  worksheet.columns = [
    {
      header: "Name",
      key: "name",
      width: "Name".length + added,
    },
    {
      header: "Faculty",
      key: "faculty",
      width: "Faculty".length + added,
    },
    {
      header: "Degree",
      key: "degreeType",
      width: "Degree".length + added,
    },
    {
      header: `Application Fee (${school.currency})`,
      key: "applicationFee",
      width: `Application Fee (${school.currency})`.length + added,
    },
    {
      header: "Application Fee Discount (%)",
      key: "applicationFeeDiscount",
      width: "Application Fee Discount (%)".length + added,
    },
    {
      header: `Tuition Fee (${school.currency})`,
      key: "tuitionFee",
      width: `Tuition Fee (${school.currency})`.length + added,
    },
    {
      header: "Tuition Fee Coverage",
      key: "tuitionFeeType",
      width: "Tuition Fee Coverage".length + added,
    },
    {
      header: "Program Timeframe",
      key: "timeframe",
      width: "Program Timeframe".length + added,
    },
    {
      header: "Program Length",
      key: "duration",
      width: "Program Length".length + added,
    },
    {
      header: "Minimum Education Level",
      key: "minimumEducationLevel",
      width: "Minimum Education Level".length + added,
    },
    {
      header: "Minimum Education Degree",
      key: "minimumEducationDegree",
      width: "Minimum Education Degree".length + added,
    },
    {
      header: "Minimum Grading Point Average",
      key: "minimumEligibilityGpa",
      width: "Minimum Grading Point Average".length + added,
    },
    {
      header: "PGWP",
      key: "pgwp",
      width: "PGWP".length + added,
    },
    {
      header: "English Proficiencies",
      key: "proficiencies",
      width: "English Proficiencies".length + added,
    },
    {
      header: "Intakes",
      key: "intakes",
      width: "Intakes".length + added,
    },
    {
      header: "Overview",
      key: "overview",
      width: 100,
    },
    {
      header: "Requirements",
      key: "requirements",
      width: 100,
    },
    {
      header: "Description",
      key: "description",
      width: 100,
    },
  ];

  worksheet.addRow([
    "Bachelor of Art in Fine Arts",
    "Fine Art",
    degreeTypes[0],
    100,
    0,
    32345.92,
    tuitionFeeType[0],
    timeframe[2],
    10,
    "primary",
    1,
    80,
    0,
    "IELTS - 9, DUOLINGO - 100",
    intakes.map((intake) => `${intake.id} - ${intake.intake}`).join(", "),
    "The B.F.A. in Art is considered the professional undergraduate degree in studio art and is designed to provide students with a thorough grounding in fundamental principles and techniques with opportunities for emphasis in one or more specific studio art areas.",
    "",
    "<h1>Bachelor of Art in Fine Arts</h1>",
  ]);

  worksheet.addRow([
    "Master of Science in Data Science (Project option)",
    "School of Computing and Mathematical Sciences",
    degreeTypes[0],
    100,
    0,
    32345.92,
    tuitionFeeType[0],
    timeframe[2],
    10,
    "primary",
    1,
    80,
    0,
    "",
    intakes.map((intake) => `${intake.id} - ${intake.intake}`).join(", "),
    "The B.F.A. in Art is considered the professional undergraduate degree in studio art and is designed to provide students with a thorough grounding in fundamental principles and techniques with opportunities for emphasis in one or more specific studio art areas.",
    "",
    "<h1>Bachelor of Art in Fine Arts</h1>",
  ]);

  for (let i = 1; i < 99; i++) {
    worksheet.addRow([]);
  }

  // * Add Validation to degree
  const degreeCol = worksheet.getColumn("degreeType");
  const applicationFeeColumn = worksheet.getColumn("applicationFee");
  const applicationFeeDiscountColumn = worksheet.getColumn(
    "applicationFeeDiscount",
  );
  const tuitionFeeColumn = worksheet.getColumn("tuitionFee");
  const tuitionFeeTypeColumn = worksheet.getColumn("tuitionFeeType");
  const timeframeColumn = worksheet.getColumn("timeframe");
  const durationColumn = worksheet.getColumn("duration");
  const minimumEducationLevelColumn = worksheet.getColumn(
    "minimumEducationLevel",
  );
  const minimumEducationDegreeColumn = worksheet.getColumn(
    "minimumEducationDegree",
  );
  const minimumEligibilityGpaColumn = worksheet.getColumn(
    "minimumEligibilityGpa",
  );
  const pgwpColumn = worksheet.getColumn("pgwp");
  const intakesColumn = worksheet.getColumn("intakes");
  const proficienciesColumn = worksheet.getColumn("proficiencies");

  degreeCol.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: [`"${degreeTypes.join(",")}"`],
        // formulae: ['"One,Two,Three,Four"'],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Degree",
        error: "Please enter a valid value.",
      };
    }
  });

  applicationFeeColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "decimal",
        operator: "greaterThanOrEqual",
        allowBlank: false,
        formulae: [0],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Application Fee",
        error: "Must be a number >= 0",
      };
    }
  });

  applicationFeeDiscountColumn.eachCell(
    { includeEmpty: true },
    (cell, rowNumber) => {
      if (rowNumber !== 1) {
        cell.dataValidation = {
          type: "decimal",
          operator: "between",
          allowBlank: false,
          formulae: [0, 100],
          showErrorMessage: true,
          errorStyle: "error",
          errorTitle: "Application Fee Discount",
          error: "Must be a number between 0 and 100",
        };
      }
    },
  );

  tuitionFeeColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "decimal",
        operator: "greaterThanOrEqual",
        allowBlank: false,
        formulae: [1],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Tuition Fee",
        error: "Must be a number >= 1",
      };
    }
  });

  tuitionFeeTypeColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: [`"${tuitionFeeType.join(",")}"`],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Tuition Fee Coverage",
        error: "Please enter a valid value.",
      };
    }
  });

  timeframeColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: [`"${timeframe.join(",")}"`],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Program Timeframe",
        error: "Please enter a valid value.",
      };
    }
  });

  durationColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "decimal",
        operator: "greaterThanOrEqual",
        allowBlank: false,
        formulae: [1],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Program Length",
        error: "Must be a number >= 1",
      };
    }
  });

  minimumEducationLevelColumn.eachCell(
    { includeEmpty: true },
    (cell, rowNumber) => {
      if (rowNumber !== 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: false,
          formulae: [
            `"${["primary", "secondary", "undergraduate", "postgraduate"].join(
              ",",
            )}"`,
          ],
          showErrorMessage: true,
          errorStyle: "error",
          errorTitle: "Minimum Education Level",
          error: "Please enter a valid value.",
        };
      }
    },
  );

  minimumEducationDegreeColumn.eachCell(
    { includeEmpty: true },
    (cell, rowNumber) => {
      if (rowNumber !== 1) {
        const entries = Object.entries(educationLevels);
        const options = entries.flatMap(([_, levels]) =>
          levels.map((level) => level.levelValue),
        );

        const max = Math.max(...options);
        const min = Math.min(...options);
        const formulae = [min, max];

        cell.dataValidation = {
          type: "whole",
          operator: "between",
          allowBlank: false,
          formulae,
          showErrorMessage: true,
          errorStyle: "error",
          errorTitle: "Minimum Education Degree",
          error: `Must be a whole number between ${min} and ${max}. Please refer to the guidelines for mappings`,
        };
      }
    },
  );

  minimumEligibilityGpaColumn.eachCell(
    { includeEmpty: true },
    (cell, rowNumber) => {
      if (rowNumber !== 1) {
        cell.dataValidation = {
          type: "decimal",
          operator: "between",
          allowBlank: false,
          formulae: [1, 100],
          showErrorMessage: true,
          errorStyle: "error",
          errorTitle: "Minimum Grading Point Average",
          error: "Must be a number between 1 and 100",
        };
      }
    },
  );

  pgwpColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.dataValidation = {
        type: "whole",
        operator: "between",
        allowBlank: false,
        formulae: [0, 1],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Minimum Grading Point Average",
        error: "Must be 0 or 1",
      };
    }
  });

  intakesColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber !== 1) {
      cell.value = intakes
        .map((intake) => `${intake.id} - ${intake.intake}`)
        .join(", ");
    }
  });

  proficienciesColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
    if (rowNumber > 3) {
      cell.value = "IELTS - 9, DUOLINGO - 90";
    }
  });

  // * Freeze First Row
  worksheet.views = [
    {
      state: "frozen",
      xSplit: 0,
      ySplit: 1,
    },
  ];

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  brandClientApi.file.saveFile(
    blob,
    DEFAULT_BULK_UPLOAD_WORKSHEET_NAME.replaceAll(" ", "_").toLowerCase() +
      ".xlsx",
  );
}
