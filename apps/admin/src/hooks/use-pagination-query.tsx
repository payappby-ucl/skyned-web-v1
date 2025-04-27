"use client";

import { useState } from "react";

const usePaginationQuery = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return {
    pagination,
    setPagination,
  };
};
export default usePaginationQuery;
