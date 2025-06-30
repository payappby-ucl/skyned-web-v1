"use client";

import { brandClientApi } from "@/src/lib/client";
import React from "react";

interface Props {
  amount: number;
  currency: string;
}
const Fee: React.FC<Props> = ({ amount, currency }) => {
  return (
    <>
      {brandClientApi.utils.formatCurrency({
        amount,
        currency,
        currencyDisplay: "symbol",
      })}
    </>
  );
};
export default Fee;
