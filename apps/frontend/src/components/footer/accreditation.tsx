import React from "react";
import icefBadgeImage from "../../../public/assets/images/icef_badge.png";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/src/config";

const Accreditation: React.FC = () => (
  <div className="flex items-center justify-center py-5">
    <Link
      href="https://www.icef.com/agency/0016M00002VhOmHQAV"
      aria-label={`Link to ${env.organization.name}'s ICEF accredited page`}
      target="_blank"
    >
      <Image
        src={icefBadgeImage}
        alt="ICEF accreditation badge"
        className="w-30"
      />
    </Link>
  </div>
);

export default Accreditation;
