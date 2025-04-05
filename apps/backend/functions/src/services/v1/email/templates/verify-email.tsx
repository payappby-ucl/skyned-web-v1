import React from "react";
import { Container, Section, Text } from "@react-email/components";
import Layout from "./layout";

interface Props {
  tokenId: string;
}

const VerifyEmail: React.FC<Props> = ({ tokenId }) => {
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

export default VerifyEmail;
