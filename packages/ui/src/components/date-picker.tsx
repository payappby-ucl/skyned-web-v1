"use client";

import { CalendarIcon } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DayPicker } from "react-day-picker";

const DatePicker: React.FC<
  React.ComponentProps<typeof DayPicker> & {
    display?: string;
  }
> = ({ display, ...props }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant={"outline"}>
          <span className="text-sm font-medium">
            {display || "Pick a date"}
          </span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-full p-0" align="start">
        <Calendar {...props} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
