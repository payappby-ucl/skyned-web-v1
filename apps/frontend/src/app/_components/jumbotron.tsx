import { cn } from "@workspace/ui/lib/utils";
import { LucideIcon } from "lucide-react";
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
    icon?: LucideIcon;
  };
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  badge?: {
    icon?: LucideIcon;
    text: string;
    className?: string;
  };
}

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  subtitle,
  backgroundImage,
  className = "",
  children,
  cta,
  overlay = false,
  badge,
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
      <div className="relative z-10">
        {badge && (
          <div
            className={cn(
              "border-1 text-white mx-auto my-4 flex w-fit items-center gap-2 rounded-full border-transparent bg-clip-padding px-3 py-1.5 text-sm",
              badge.className,
            )}
            style={{
              borderImage:
                "linear-gradient(90deg, rgb(255 255 255 / 2%) 0%, rgb(240 240 240 / 9%) 40%, rgb(255 255 255 / 0%) 100%) 1 / 1 / 0 stretch",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(173,216,230,0.10) 100%)",
              clipPath: "border-box",
            }}
          >
            {badge.icon && <badge.icon size={14} />} {badge.text}
          </div>
        )}
        <h1 className="relative z-[1] mx-auto max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="relative z-[1] mx-auto max-w-lg">{subtitle}</p>
        )}
        {cta && (
          <div className="relative z-[1] mt-8">
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
              {cta.icon && (
                <cta.icon strokeWidth={0.7} className="ml-2 inline-block" />
              )}
            </Link>
          </div>
        )}
        {children && <div className="relative z-[1]">{children}</div>}
      </div>
      {overlay && <div className="absolute inset-0 z-0 bg-black/70"></div>}
    </header>
  );
};

export default Jumbotron;
