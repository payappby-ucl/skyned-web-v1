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
  overlay?: boolean;
}

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  subtitle,
  backgroundImage,
  className = "",
  children,
  cta,
  overlay = false,
}) => {
  return (
    <header
      role="banner"
      className={cn(
        "text-background dark:text-foreground !pt-30 md:!pt-50 relative space-y-4 bg-gray-700 bg-cover bg-center bg-no-repeat !px-6 !pb-20 text-center md:!pb-40",
        className,
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="relative z-[1]">{title}</h1>
      {subtitle && <p className="mx-auto max-w-lg relative z-[1]">{subtitle}</p>}
      {cta && (
        <div className="mt-8 relative z-[1]">
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
      {children && <div className="relative z-[1]">{children}</div>}
      {overlay && <div className="absolute inset-0 z-0 bg-black opacity-50"></div>}
    </header>
  );
};

export default Jumbotron;
