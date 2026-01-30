import { Heading, Section, Text } from "@react-email/components";
import { Layout } from "./layout";
import { Regards } from "./regards";
import { ApplyFormSchema, IProgram } from "@workspace/shared";

export interface LeadCollectionNotificationEmailProps {
  program: IProgram;
  formDetails: ApplyFormSchema;
}

export const LeadCollection = ({
  program,
  formDetails: {
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    education,
    employment,
    countryOfInterest,
    budget,
  },
}: LeadCollectionNotificationEmailProps) => (
  <Layout
    title="Application Submission"
    preview={`Lead submitted - ${firstName} ${lastName}`}
  >
    <Heading as="h2">Lead Form Submission</Heading>
    <Text>
      Dear Team,
      <br />A new lead has been submitted through the admissions portal. Kindly
      find the details below:
    </Text>

    <Section>
      <Heading as="h3">Applicant Information</Heading>
      <Text>
        <strong>Full Name:</strong> {firstName} {lastName} <br />
        <strong>Email Address:</strong> {email} <br />
        <strong>Phone Number:</strong> {phoneNumber} <br />
        <strong>Gender:</strong> {gender}
      </Text>
    </Section>

    <Section>
      <Heading as="h3">Program Information</Heading>
      <Text>
        <strong>Program Clicked:</strong> {program.name} <br />
        <strong>Institution:</strong> {program.school?.name} <br />
      </Text>
    </Section>

    <Section>
      <Heading as="h3">Educational Background</Heading>
      <Text>
        <strong>Highest Level of Education:</strong>{" "}
        {education.highestLevelOfEducation} <br />
        {education.value && (
          <>
            <strong>Additional Details:</strong> {education.value}
          </>
        )}
      </Text>
    </Section>

    <Section>
      <Heading as="h3">Employment History</Heading>
      <Text>
        <strong>Status:</strong> {employment.employed} <br />
        {employment.job && (
          <>
            <strong>Current Job/Position:</strong> {employment.job} <br />
          </>
        )}
        {employment.yearsOfExperience && (
          <>
            <strong>Years of Experience:</strong> {employment.yearsOfExperience}
          </>
        )}
      </Text>
    </Section>

    <Section>
      <Heading as="h3">Other Information</Heading>
      <Text>
        <strong>Country of Interest:</strong>{" "}
        {countryOfInterest?.join(", ") || "N/A"} <br />
        <strong>Budget Declaration:</strong> {budget.hasBudget} <br />
        {budget.budget && (
          <>
            <strong>Budget:</strong> {budget.budget.currency}{" "}
            {budget.budget.amount}
          </>
        )}
      </Text>
    </Section>

    <Text>Please follow up on this lead so we can get conversions</Text>
    <Regards from="Application System" />
  </Layout>
);
