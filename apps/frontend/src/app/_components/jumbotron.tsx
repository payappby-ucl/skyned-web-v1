import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import React from "react";

interface JumbotronProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage: string;
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
    className?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  subtitle,
  backgroundImage,
  className = "",
  children,
  cta,
}) => {
  return (
    <section
      className={cn(
        "text-background dark:text-foreground space-y-4 bg-gray-700 bg-cover bg-center bg-no-repeat !pt-20 md:!pt-50 md:!pb-40 text-center",
        className,
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>{title}</h1>
      {subtitle && <p className="mx-auto max-w-lg">{subtitle}</p>}
      {cta && (
        <div className="mt-8">
          <Link
            href={cta.href}
            className={cn(
              "inline-block rounded-md px-4 py-2 text-sm font-semibold",
              cta.variant === "primary"
                ? "bg-brand text-white"
                : "bg-gray-200 text-gray-800",
              cta.className,
            )}
          >
            {cta.label}
          </Link>
        </div>
      )}
      {children}
    </section>
  );
};

export default Jumbotron;
