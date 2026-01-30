import React from "react";
import { Container, Section, Text } from "@react-email/components";
import { Layout } from "./layout";

/** Properties needed for VerifyEmail Component */
export interface VerifyEmailProps {
  tokenId: string;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ tokenId }) => {
  return (
    <Layout title="Verify Email" preview="Verify your email address">
      <Container>
        <Section>
          <Text className="text-xl font-bold"> Hi, </Text>
        </Section>
      </Container>
    </Layout>
  );
};
