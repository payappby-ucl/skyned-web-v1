"use client";

import { useCallback, useMemo, useState } from "react";
import { brandClientApi } from "../lib/client";
import { FinancialAidSchema } from "@workspace/shared";

const storageKeyName = "financial-aid-eligibility";
const useFinancialAidEligibility = () => {
  const [loading, setLoading] = useState(false);
  const financialAidEligibility = useMemo(() => {
    const data = brandClientApi.storage.localStorage.getItem(storageKeyName);
    if (!data) return null;
    return JSON.parse(data) as FinancialAidSchema;
  }, []);

  const saveFinancialAidEligibility = useCallback(
    (data: FinancialAidSchema) => {
      brandClientApi.storage.localStorage.setItem(
        storageKeyName,
        JSON.stringify(data),
      );
    },
    [],
  );

  return {
    financialAidEligibility,
    saveFinancialAidEligibility,
    loading,
    setLoading,
  };
};

export default useFinancialAidEligibility;
