
import { cn } from "@workspace/ui/lib/utils";
import React from "react";

interface JumbotronProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage: string;
  className?: string;
  children?: React.ReactNode;
}

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  subtitle,
  backgroundImage,
  className = "",
  children,
}) => {
  return (
    <section
      className={cn("text-background dark:text-foreground space-y-4 text-center bg-gray-700 bg-cover bg-center bg-no-repeat bg-blend-multiply !pt-16 md:!pt-50 md:!pb-40", className)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>{title}</h1>
      {subtitle && (
        <p className="mx-auto max-w-lg">{subtitle}</p>
      )}
      {children}
    </section>
  );
};

export default Jumbotron;
