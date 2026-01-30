import Image from "next/image";
import logo from "../../../../public/assets/images/brand/logo.png";
import { env } from "@/src/config";
import Link from "next/link";
import FinancialAidEligibilityForm from "./_components/form";

export default function EligibilityPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <header>
        <Link href="/">
          <Image
            src={logo}
            alt={`${env.organization.name}'s Logo`}
            className="ml-4 w-20 md:w-24 lg:w-28"
          />
        </Link>
      </header>

      <div className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-10">
        <FinancialAidEligibilityForm />
      </div>
    </section>
  );
}
