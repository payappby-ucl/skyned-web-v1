import { IAdmin } from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import Link from "next/link";
import React from "react";

type Props = Pick<
  IAdmin,
  "adminId" | "firstName" | "lastName" | "jobTitle" | "primaryImage"
> & { disabled?: boolean };

const ProfileInfo: React.FC<Omit<Props, "disabled">> = (props) => (
  <>
    <Avatar>
      <AvatarImage
        src={props.primaryImage.url}
        alt={`${props.firstName} ${props.lastName}'s Profile image`}
        className="object-cover"
      />
      <AvatarFallback className="uppercase">
        {props.firstName[0]}
        {props.lastName[0]}
      </AvatarFallback>
    </Avatar>
    <div className="font-semibold">
      <p>
        {props.firstName} {props.lastName}
      </p>
      <p className="text-xs">{props.jobTitle}</p>
    </div>
  </>
);

const Profile: React.FC<Props> = (props) =>
  props.disabled ? (
    <div className="flex items-center gap-2">
      <ProfileInfo {...props} />
    </div>
  ) : (
    <Link
      href={`/admins/${props.adminId}`}
      className="flex items-center gap-2"
      aria-label={`Link to ${props.firstName} ${props.lastName}'s profile page`}
    >
      <ProfileInfo {...props} />
    </Link>
  );

export default Profile;
