import { env } from "@/src/config";
import { addresses } from "@/src/utils";
import { Button } from "@workspace/ui/components/button";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  office: (typeof addresses)[0];
  consultation?: boolean;
}
const Office: React.FC<Props> = ({ office, consultation }) => {
  return (
    <address
      className={`bg-background lg:nth-5:col-start-2 flex flex-col gap-3 rounded-md p-4 md:last:col-start-2 lg:col-span-2 lg:last:col-start-6`}
    >
      <div className="bg-accent w-fit rounded-sm p-2">
        <MapPinIcon size={14} className="text-brand" />
      </div>
      <h3 className="!text-md not-italic">{office.location}</h3>
      <p className="text-sm not-italic">
        {office.streetAddress}, {office.addressLocality} {office.addressRegion}
      </p>
      {consultation ? (
        <Button
          asChild
          className="w-full rounded-full p-1 text-sm not-italic"
          variant="brand"
        >
          <Link
            href={office.consultationLink}
            aria-label={`Our ${office.location} physical consultation booking page`}
            target="_blank"
          >
            Book a Visit
          </Link>
        </Button>
      ) : (
        <Link
          href={`${env.map.googleMapsBaseUrl}${office.streetAddress}, ${office.addressLocality} ${office.addressRegion}`}
          aria-label="View address in google map"
          className="text-brand flex items-center gap-1 text-sm font-semibold not-italic"
          target="_blank"
        >
          Open in map <ArrowUpRightIcon size={13} />
        </Link>
      )}
    </address>
  );
};

export default Office;
