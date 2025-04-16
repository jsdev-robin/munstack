"use client";

import React from "react";
import { DataGridPrivider } from "@/context/data-grid-context";
import { flexRender, Table } from "@tanstack/react-table";
import {
  Grid,
  GridBody,
  GridCell,
  GridHead,
  GridHeader,
  GridRow,
} from "../ui/grid";
import { cn } from "@/lib/utils";

export interface DataGridProps<T> {
  table: Table<T>;
}

const DataGrid = <T,>({ table }: DataGridProps<T>) => {
  return (
    <DataGridPrivider table={table}>
      <div className="flex relative rounded-md overflow-hidden border border-border">
        <div className="overflow-hidden flex-1">
          <div
            className={cn(
              "w-full bg-muted overflow-hidden reserve-scrollbar-space scrollbar-none border-b border-border"
            )}
          >
            <Grid className="w-full table-fixed">
              <GridHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <GridRow
                    key={headerGroup.id}
                    className="*:border-r *:border-border *:last:border-none border-none"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <GridHead
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            minWidth: header.getSize() || 200,
                            width: header.getSize() || 200,
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                              title={
                                header.column.getCanSort()
                                  ? header.column.getNextSortingOrder() ===
                                    "asc"
                                    ? "Sort ascending"
                                    : header.column.getNextSortingOrder() ===
                                      "desc"
                                    ? "Sort descending"
                                    : "Clear sort"
                                  : undefined
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </GridHead>
                      );
                    })}
                  </GridRow>
                ))}
              </GridHeader>
            </Grid>
          </div>
          <div
            className={cn("w-full overflow-auto")}
            style={{ maxHeight: "70vh" }}
          >
            <Grid className="w-full table-fixed">
              <GridBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <GridRow
                      key={row.id}
                      className="*:border-r *:border-border"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <GridCell
                            key={cell.id}
                            tabIndex={0}
                            className="truncate focus-within:bg-green-500/15"
                            style={{
                              minWidth: cell.column.getSize(),
                              width: cell.column.getSize(),
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </GridCell>
                        );
                      })}
                    </GridRow>
                  );
                })}
              </GridBody>
            </Grid>
          </div>
        </div>
      </div>
    </DataGridPrivider>
  );
};

export default DataGrid;
