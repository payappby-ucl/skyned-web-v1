import { Hr, Img, Link, Section } from "@react-email/components";
import React from "react";
import { env } from "../../../../config";

export const Header: React.FC = () => (
  <>
    <Section className="px-4 py-2">
      <Link
        href={env.domains.frontendDomain}
        aria-label="Skyned Consults website address"
      >
        <Img
          src={`${env.domains.frontendDomain}/assets/images/brand/logo.png`}
          alt="Skyned Consults Logo"
          width={110}
          className="mx-auto"
        />
      </Link>
    </Section>
    <Hr />
  </>
);
