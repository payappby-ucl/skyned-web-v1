import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import React, { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

/** Represents Props needed to properly display the Layout component */
export interface LayoutProps {
  /** Page Title */
  title: string;

  /** Email preview text */
  preview: string;
}

/** Style for the Container component */
const container = {
  border: "1px solid #e2e8f0",
};

/** Layout Component */

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  title,
  preview,
  children,
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{title}</title>
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#002369",
              },
            },
          },
        }}
      >
        <Body className="bg-white text-[#020618] font-sans">
          <Container className="rounded-md" style={container}>
            <Header />
            <Section className="px-4">{children}</Section>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
