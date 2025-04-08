import { Sparkles } from "lucide-react";
import React from "react";
import HeroSearch from "./search";

const HeroSection: React.FC = () => {
  return (
    <section className="text-background dark:text-foreground flex min-h-[calc(100vh-61.0938px)] flex-col items-center justify-center bg-gradient-to-b from-[#3477FE] via-[#013191] to-[#002369]">
      <header className="container mx-auto flex flex-col items-center gap-10">
        <div>
          <p className="bg-brand-50/10 mx-auto flex w-fit items-center gap-2 rounded-md p-1 text-xs">
            <Sparkles size={10} className="font-bold" /> Find Your Program |
            Country
          </p>
          <h1 className="max-w-3xl text-center md:!text-[70px]">
            Achieve Your <span className="text-brand-400">Dreams</span> of
            Moving <span className="text-brand-400">Abroad</span>.
          </h1>
        </div>
        <p className="max-w-3xl text-center">
          We offer free and seamless international study application support
          into bachelors, postgraduate diploma, postbaccalaureate, graduate
          certificates and masters programs
        </p>
        <HeroSearch />
      </header>
    </section>
  );
};
export default HeroSection;
