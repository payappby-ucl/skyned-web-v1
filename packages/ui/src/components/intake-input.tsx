"use client";
import React, { useMemo } from "react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./select";
import { SelectProps } from "@radix-ui/react-select";
import { setMonth, format } from "date-fns";

const IntakeInput: React.FC<
  SelectProps & {
    startYear?: number;
    endYear?: number;
  }
> = ({
  startYear = new Date().getFullYear(),
  endYear = new Date().getFullYear() + 5,
  ...props
}) => {
  if (`${startYear}`.length !== 4 || `${endYear}`.length !== 4) {
    throw new Error("Invalid intake years");
  }

  if (startYear > endYear) {
    throw new Error("Start cannot be greater than end");
  }

  const options = useMemo(() => {
    const opts = [];

    for (let i = startYear; i <= endYear; i++) {
      for (let j = 0; j <= 11; j++) {
        const month = format(setMonth(new Date(), j), "MMM");
        opts.push(`${month.toUpperCase()} ${i}`);
      }
    }

    return opts;
  }, [startYear, endYear]);

  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select intake" />
      </SelectTrigger>
      <SelectContent>
        {options.map((intake) => (
          <SelectItem
            key={intake}
            value={intake}
            className="hover:bg-accent font-semibold"
          >
            {intake}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { IntakeInput };
