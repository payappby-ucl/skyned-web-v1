"use client";

import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./pagination.js";

interface Props {
  goToPage(newPage: number): void;
  totalCount: number;
  perPage: number;
  currentPage: number;
}
const BrandPagination: React.FC<Props> = ({
  goToPage,
  totalCount,
  perPage,
  currentPage,
}) => {
  const totalPages = useMemo(
    () => Math.ceil(totalCount / perPage),
    [totalCount, perPage],
  );
  const pageArray = useMemo(() => {
    if (totalPages > 3) return [1, 2, 3];
    else {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
  }, [totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
          </PaginationItem>
        ) : null}

        {pageArray.map((pageNumber) => (
          <PaginationItem key={`page_${pageNumber}`} className="cursor-pointer">
            <PaginationLink
              isActive={pageNumber === currentPage}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 3 ? (
          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {currentPage < totalPages ? (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => goToPage(currentPage + 1)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export { BrandPagination };
