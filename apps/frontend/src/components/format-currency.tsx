"use client";

import React from "react";
import { brandClientApi } from "../lib/client";

const FormatCurrency: React.FC<
  Parameters<typeof brandClientApi.utils.formatCurrency>["0"]
> = (props) => <>{brandClientApi.utils.formatCurrency(props)}</>;
export default FormatCurrency;
