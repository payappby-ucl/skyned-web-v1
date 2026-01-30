"use client";

import { useState } from "react";

const usePaginationQuery = (data?: {
  pageIndex?: number;
  pageSize?: number;
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: data?.pageIndex || 0,
    pageSize: data?.pageSize || 10,
  });

  return {
    pagination,
    setPagination,
  };
};
export default usePaginationQuery;
