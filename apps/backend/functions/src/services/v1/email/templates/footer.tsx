import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

const socialLinks = [
  {
    Icon: "https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Ffacebook.png?alt=media&token=34c049a3-f162-440b-9311-dab6e880eacb",
    url: "https://web.facebook.com/people/Skyned-Consults-Corporation/100086920969875",
    alt: "Skyned Consults Corporation's Facebook Page Link",
  },
  {
    Icon: "https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Ftwitter.png?alt=media&token=1ee1974d-aeec-4011-921f-db242f4c2f3c",
    url: "https://twitter.com/SkynedC",
    alt: "Skyned Consults Corporation's X (twitter) Page Link",
  },
  {
    Icon: "https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Flinkedin.png?alt=media&token=85a7b013-7389-4ca8-b902-b6837f7aa96d",
    url: "https://www.linkedin.com/company/skyned-educational-consults",
    alt: "Skyned Consults Corporation's Linkedin Page Link",
  },
  {
    Icon: "https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Finstagram.png?alt=media&token=b55d1576-b8a6-4ca6-a105-b488ff9b2944",
    url: "https://www.instagram.com/studyabroad_consults",
    alt: "Skyned Consults Corporation's Instagram Page Link",
  },
  {
    Icon: "https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Ftik-tok.png?alt=media&token=9def7957-49b0-41a8-9656-d7b49649c39f",
    url: "https://www.tiktok.com/@skynededu",
    alt: "Skyned Consults Corporation's Tiktok Page Link",
  },
];

export const Footer: React.FC = () => (
  <Section>
    <Hr />
    <Section className="py-2 px-4">
      <Row className="max-w-xs py-2">
        {socialLinks.map(({ alt, Icon, url }) => (
          <Column key={alt}>
            <Link href={url} target="_blank" aria-label={alt}>
              <Img
                src={Icon}
                alt={alt}
                width={20}
                height={20}
                className="mx-auto"
              />
            </Link>
          </Column>
        ))}
        <Link href="" target="_blank"></Link>
      </Row>
    </Section>
    <Section className="bg-brand text-white  px-4 py-5">
      <Text className="text-center text-xs">
        &copy; {new Date().getFullYear()} Skyned Consults Corporation. All
        rights reserved.
      </Text>
      <Row className="max-w-sm">
        <Column>
          <Text className="text-sm text-center">
            Our vision is to be the first choice education consultancy platform
            by making the international study application process seamless and
            efficient for all.
          </Text>
        </Column>
      </Row>

      <Link
        href="https://www.unicollegelink.com"
        target="_blank"
        aria-label="Our sister company - Unicollegelink's Website"
      >
        <Img
          src="https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Funicollgelink_white.png?alt=media&token=e692043f-8bd7-4b2d-8d8d-a8f04454698c"
          alt="Our sister company - Unicollegelink's Logo"
          width={100}
          className="mx-auto"
        />
      </Link>
    </Section>
  </Section>
);
