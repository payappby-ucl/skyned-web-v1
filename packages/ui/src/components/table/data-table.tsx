"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { DataTableViewOptions } from "./toggle-column";
import React, { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";

interface HiddenPagination {
  hidePagination: true;
}

interface VisiblePagination {
  hidePagination: false;
  rowCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}

type PaginationType = HiddenPagination | VisiblePagination;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  children?: React.ReactNode;
  hideViewOptions?: boolean;
  pagination?: PaginationType;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
  hideViewOptions,
  pagination,
  rowCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    onPaginationChange:
      !pagination || pagination.hidePagination
        ? undefined
        : pagination?.setPagination,
    rowCount:
      !pagination || pagination.hidePagination
        ? undefined
        : pagination?.rowCount,
    state: {
      sorting,
      columnVisibility,
      pagination:
        !pagination || pagination.hidePagination
          ? undefined
          : pagination?.pagination,
    },
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-2">
        {children}
        {!hideViewOptions ? <DataTableViewOptions table={table} /> : null}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!pagination || pagination.hidePagination ? null : (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}
