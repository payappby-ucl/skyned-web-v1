import { ContactUsSchema, IInquiry } from "@workspace/shared";
import { Layout } from "./layout";
import { Section, Heading, Row, Hr, Text } from "@react-email/components";

/**
 * Represents props needed to send contact us email
 */
export type ContactUsEmailTemplateProps = Omit<
  ContactUsSchema,
  "phoneNumber"
> & {
  phoneNumber: IInquiry["phoneNumber"];
};

/**
 * Represents contact us email template
 */

export const ContactUsEmail = ({
  name,
  email,
  phoneNumber,
  message,
  subject,
}: ContactUsEmailTemplateProps) => {
  return (
    <Layout preview="You have a new inquiry from your website" title={subject}>
      <Section>
        <Heading as="h1" className="text-2xl font-medium text-center">
          You have a new inquiry from your website
        </Heading>
      </Section>
      <Section className="mt-5">
        <Row>
          <Text className="m-0 font-bold">Name</Text>
          <Text className="m-0 font-light text-xs">{name}</Text>
        </Row>
        <Hr />
        <Row>
          <Text className="m-0 font-bold">Email</Text>
          <Text className="m-0 font-light text-xs">{email}</Text>
        </Row>
        <Hr />
        <Row>
          <Text className="m-0 font-bold">Subject</Text>
          <Text className="m-0 font-light text-xs">{subject}</Text>
        </Row>
        <Hr />
        <Row>
          <Text className="m-0 font-bold">Phone Number</Text>
          <Text className="m-0 font-light text-xs">{phoneNumber.number}</Text>
        </Row>
        <Hr />
        <Row>
          <Text className="m-0 font-bold">Message</Text>
          <Text className="m-0 font-light text-xs">{message}</Text>
        </Row>
      </Section>
    </Layout>
  );
};
