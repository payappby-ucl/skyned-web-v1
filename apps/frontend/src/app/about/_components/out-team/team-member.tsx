import Image from "next/image";
import React from "react";
import MemberDetails from "./member-details";
import { teams } from "@/src/utils";

const TeamMember: React.FC<(typeof teams)[0]> = (props) => {
  const { firstName, lastName, imageUrl, title } = props;
  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="!h-50 border-background group relative -bottom-14 mx-auto w-[200px] overflow-x-hidden rounded-lg border-2">
        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}'s profile image`}
          width={200}
          height={100}
          className="h-full object-cover grayscale"
        />

        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}'s profile image`}
          width={200}
          height={100}
          className="absolute top-0 h-full -translate-y-full translate-x-full object-cover transition-all group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </div>
      <div className="bg-background pt-15 rounded-md pb-5 text-center">
        <h3 className="!text-lg">
          {firstName} {lastName}
        </h3>
        <p className="text-sm">{title}</p>

        <MemberDetails {...props} />
      </div>
    </div>
  );
};

export default TeamMember;
