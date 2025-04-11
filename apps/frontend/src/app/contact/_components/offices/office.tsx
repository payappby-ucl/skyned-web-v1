import { env } from "@/src/config";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  office: {
    location: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
  };
}
const Office: React.FC<Props> = ({ office }) => {
  return (
    <address className="bg-background flex flex-col gap-3 rounded-md p-4">
      <div className="bg-accent w-fit rounded-sm p-2">
        <MapPinIcon size={14} className="text-brand" />
      </div>
      <h3 className="!text-md not-italic">{office.location}</h3>
      <p className="text-sm not-italic">
        {office.streetAddress}, {office.addressLocality} {office.addressRegion}
      </p>
      <Link
        href={`${env.map.googleMapsBaseUrl}${office.streetAddress}, ${office.addressLocality} ${office.addressRegion}`}
        aria-label="View address in google map"
        className="text-brand flex items-center gap-1 text-sm font-semibold not-italic"
        target="_blank"
      >
        Open in map <ArrowUpRightIcon size={13} />
      </Link>
    </address>
  );
};

export default Office;
