import { env } from "@/src/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CopyRight: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} {env.organization.name}. All Rights
        Reserved.
      </p>
      <Link href="https://www.unicollegelink.com" target="_blank">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/unicollegelink.appspot.com/o/assets%2Funicollgelink1.png?alt=media&token=10dfe63d-3815-47c2-8312-1570b4e5d88d"
          alt="Unicollegelink's Logo"
          width={150}
          height={80}
        />
      </Link>
    </div>
  );
};

export default CopyRight;
