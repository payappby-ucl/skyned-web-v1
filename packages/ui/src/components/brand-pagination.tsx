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
} from "./pagination";

interface Props {
  goToPage(newPage: number): void;
  setLimit?: (limit: number) => void;
  totalCount: number;
  perPage: number;
  currentPage: number;
}
const BrandPagination: React.FC<Props> = ({
  goToPage,
  totalCount,
  perPage,
  currentPage,
  setLimit,
}) => {
  const totalPages = useMemo(
    () => Math.ceil(totalCount / perPage),
    [totalCount, perPage],
  );

  const pageArray = useMemo(() => {
    if (totalPages > 5) return [1, 2];
    else {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
  }, [totalPages]);

  const lastPageArray = useMemo(() => {
    if (totalPages > 5) return [totalPages - 1, totalPages];
    else return [];
  }, [totalPages]);

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-between md:justify-center w-full">
        <div className="flex items-center">
          {pageArray.map((pageNumber) => (
            <PaginationItem
              key={`page_${pageNumber}`}
              className="cursor-pointer"
            >
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 ? (
            <PaginationItem className="cursor-pointer">
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          {lastPageArray.map((pageNumber) => (
            <PaginationItem
              key={`page_${pageNumber}`}
              className="cursor-pointer"
            >
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {currentPage > 1 ? (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => goToPage(currentPage - 1)}
                className="text-sm !px-4 !py-1 border rounded-md"
              />
            </PaginationItem>
          ) : null}

          {currentPage < totalPages ? (
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() => goToPage(currentPage + 1)}
                className="text-sm !px-4 !py-1 rounded-md border"
              />
            </PaginationItem>
          ) : null}
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export { BrandPagination };
