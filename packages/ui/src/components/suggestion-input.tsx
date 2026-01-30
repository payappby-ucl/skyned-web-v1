"use client";

import React from "react";
import { Input } from "./input";

const SuggestionInput: React.FC<
  React.ComponentProps<"input"> & {
    suggestions: string[];
    listName: string;
  }
> = ({ suggestions, listName, ...props }) => {
  return (
    <>
      <Input list={listName} {...props} />
      <datalist id={listName}>
        {suggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
    </>
  );
};

export { SuggestionInput };
