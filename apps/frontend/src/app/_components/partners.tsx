import Image from "next/image";
import Link from "next/link";
import React from "react";

const partners = [
  {
    organizationName: "Canadian Imperial Bank of Commerce",
    websiteLink: "https://www.cibc.com/en/personal-banking.html",
    websiteLogoLink:
      "https://www.cibc.com/content/dam/global-assets/logos/cibc-logos/no-tagline/cibc-logo-colour-142x36.svg",
  },
  {
    organizationName: "MPOWER Financing",
    websiteLink: "https://www.mpowerfinancing.com",
    websiteLogoLink:
      "https://www.mpowerfinancing.com/wp-content/uploads/2024/08/Logo-MPower.png.webp",
  },
  {
    organizationName: "Passage Inc.",
    websiteLink: "https://www.passage.com",
    websiteLogoLink:
      "https://cdn.prod.website-files.com/6584d9f09c54f1e2bb8ce41a/66151ab09a41551308b0336e_Logo.svg",
  },
];

const Partners: React.FC = () => {
  return (
    <section>
      <div className="container flex flex-col items-center justify-center space-y-10">
        <h2 className="text-center !text-xl !font-normal">
          WE ARE PARTNERS WITH LEADING GLOBAL BUSINESSES
        </h2>
        <div className="flex items-center gap-5">
          {partners.map(
            ({ websiteLink, organizationName, websiteLogoLink }) => (
              <Link
                href={websiteLink}
                target="_blank"
                aria-label={`${organizationName}'s website link`}
                key={organizationName}
              >
                <Image
                  src={websiteLogoLink}
                  alt={`${organizationName}'s Logo`}
                  width={120}
                  height={80}
                />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
