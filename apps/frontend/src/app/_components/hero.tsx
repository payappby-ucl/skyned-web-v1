import { Sparkles, SparklesIcon } from "lucide-react";
import React from "react";
import HeroSearch from "./search";

const HeroSection: React.FC = () => {
  return (
    <section className="text-background dark:text-foreground flex min-h-[calc(100vh-61.0938px)] flex-col items-center justify-center bg-gradient-to-b from-[#3477FE] via-[#013191] to-[#002369]">
      <header className="container mx-auto flex flex-col items-center gap-10">
        <div>
          <small
            className="my-4 mx-auto w-fit flex items-center gap-2 rounded-full border-1 border-transparent bg-clip-padding px-3 py-1.5 text-white"
            style={{
              borderImage:
                "linear-gradient(90deg, rgb(255 255 255 / 2%) 0%, rgb(240 240 240 / 9%) 40%, rgb(255 255 255 / 0%) 100%) 1 / 1 / 0 stretch",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(173,216,230,0.10) 100%)",
              clipPath: "border-box",
            }}
          >
            <SparklesIcon size={14} /> Find Your Program | Country
          </small>
          <h1 className="max-w-3xl text-center md:!text-[70px]">
            Your Next Big Move. Apply to Study Abroad
          </h1>
        </div>
        <p className="max-w-3xl text-center">
          We've guided 1000+ students who wanted more, more opportunities, more
          future. Get free, transparent support for undergraduate, PGD, and
          master's applications to the right international schools.
        </p>
        <HeroSearch />
      </header>
    </section>
  );
};
export default HeroSection;
