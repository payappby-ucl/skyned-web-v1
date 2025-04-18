import { Button } from "@workspace/ui/components/button";
import React from "react";

const PersonalityTest: React.FC = () => {
  return (
    <div className="bg-brand text-background dark:text-foreground mx-auto max-w-2xl space-y-4 rounded-lg p-10 text-center">
      <h2>Personality Test</h2>
      <p>Find the program that matches your personality.</p>
      <Button className="bg-background dark:bg-foreground text-foreground dark:text-background">
        Take Free Test
      </Button>
    </div>
  );
};
export default PersonalityTest;
