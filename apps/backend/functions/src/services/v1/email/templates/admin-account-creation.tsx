import {
  Column,
  Heading,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import React from "react";
import { Regards } from "./regards";
import { Layout } from "./layout";
import { IObject } from "@workspace/shared";

/**
 * Represents props needed to send account creation email
 */
export interface AdminAccountCreationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: IObject;
}

/**
 * Admin account creation email template
 */

export const AdminAccountCreation: React.FC<AdminAccountCreationEmailProps> = ({
  firstName,
  lastName,
  email,
  password,
  image,
}) => (
  <Layout
    title="Account Creation"
    preview="You Skyned account has been created"
  >
    <Section>
      <Row>
        <Column align="right" className="w-10">
          <Img
            src={image.url}
            alt={`${firstName} ${lastName}'s image`}
            className="object-cover object-top rounded-full w-10 h-10"
          />
        </Column>
        <Column align="left" className="w-full">
          <Text className="m-0 ml-4">
            {firstName} {lastName}
          </Text>
          <Text className="m-0 ml-4 text-xs">
            <Link href={`mailto:${email}`} className="text-gray-400">
              {email}
            </Link>
          </Text>
        </Column>
      </Row>
    </Section>
    <Section>
      <Heading as="h2" className="font-medium text-lg">
        Account Creation
      </Heading>
      <Text>
        Dear {firstName} {lastName},
      </Text>
      <Text>
        This is to notify you of the creation of your account on the Skyned
        Consults admin dashboard. Details as follows
      </Text>
      <Text>
        <strong>Email:</strong> {email} <br />
        <strong>Password:</strong> {password}
      </Text>
      <Text>
        Please do well to delete this mail or reset your password to avoid
        unauthorized access.
      </Text>
    </Section>
    <Regards from="Admin" />
  </Layout>
);
