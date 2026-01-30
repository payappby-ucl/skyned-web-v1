"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SelectProps } from "@radix-ui/react-select";

const currencies = ["USD", "CAD", "AUD", "NGN", "EUR", "GBP"];

function CurrencyInput(props: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={`${currency}`} value={currency}>
            <p className="font-medium text-sm">{currency}</p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { CurrencyInput };
