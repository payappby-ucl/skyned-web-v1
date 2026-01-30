/* eslint-disable max-len */
import { Section, Text, Heading } from "@react-email/components";
import { Layout } from "./layout";
import { IFinancialAid, IProgram, ISchool } from "@workspace/shared";
import { Country } from "country-state-city";
import { Regards } from "./regards";

export interface FinancialAidNotificationEmailProps {
  program: IProgram;
  school: ISchool;
  data: IFinancialAid;
}

export const FinancialAidNotificationEmail = ({
  data,
  school,
  program,
}: FinancialAidNotificationEmailProps) => {
  return (
    <Layout
      title="New Financial Aid Application"
      preview={`New Financial Aid Application from ${data.firstName} ${data.lastName}`}
    >
      <Heading as="h3">🎓 New Financial Aid Application Received</Heading>

      <Text>
        A new financial aid application has been submitted. Below are the
        applicant's details:
      </Text>

      <Section>
        <Heading as="h4">Applicant Information</Heading>
        <Text>
          <b>Full Name:</b> {data.firstName} {data.lastName}
        </Text>
        <Text>
          <b>Email:</b> {data.email}
        </Text>
        <Text>
          <b>Phone:</b> ({data.phoneNumber.countryCallingCode}){" "}
          {data.phoneNumber.nationalNumber}
        </Text>
        <Text>
          <b>Citizenship:</b> {Country.getCountryByCode(data.citizenship)?.name}
        </Text>
        <Text className="capitalize">
          <b>Canadian Resident:</b> {data.canadianResident}
        </Text>
      </Section>

      <Section>
        <Heading as="h4">Program Information</Heading>
        <Text>
          <b>School:</b> {school.name}
        </Text>
        <Text>
          <b>Program:</b> {program.name}
        </Text>
        <Text className="capitalize">
          <b>Study Level:</b> {data.studyLevel}
        </Text>
        <Text className="capitalize">
          <b>Program Started:</b> {data.programStarted}
        </Text>
        <Text>
          <b>Next School Term:</b>{" "}
          {new Date(data.nextSchoolTerm).toLocaleDateString()}
        </Text>
        <Text>
          <b>GPA:</b> {data.gpa}
        </Text>
      </Section>

      <Section>
        <Heading as="h4">Financial</Heading>
        <Text className="capitalize">
          <b>Loan Type:</b> {data.loanType}
        </Text>
        {data.livingExpensesCoverage && (
          <Text className="capitalize">
            <b>Living Expenses Coverage:</b> {data.livingExpensesCoverage}
          </Text>
        )}
        <Text className="capitalize">
          <b>PGWP Eligible:</b> {data.pgwp}
        </Text>
        <Text className="capitalize">
          <b>Has Offer Letter:</b> {data.hasOfferLetter}
        </Text>
        <Text className="capitalize">
          <b>Partner:</b> {data.partner}
        </Text>
      </Section>
      <Regards from="Admin" />
    </Layout>
  );
};
