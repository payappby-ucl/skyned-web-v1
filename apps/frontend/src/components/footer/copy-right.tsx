import { env } from "@/src/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CopyRight: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 md:flex-row md:justify-between">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} {env.organization.name}. All Rights
        Reserved.
      </p>
      <Link href="https://www.unicollegelink.com" target="_blank">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Funicollgelink_white.png?alt=media&token=e692043f-8bd7-4b2d-8d8d-a8f04454698c"
          alt="Unicollegelink's Logo"
          width={150}
          height={80}
        />
      </Link>
    </div>
  );
};

export default CopyRight;
