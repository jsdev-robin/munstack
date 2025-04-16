"use client";

import React from "react";
import { Grid, GridHead, GridHeader, GridRow } from "../ui/grid";
import { useDataGrid } from "@/context/data-grid-context";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const DataGridHeader = () => {
  const { table, headerRef } = useDataGrid();

  return (
    <div
      ref={headerRef}
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
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
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
  );
};

export default DataGridHeader;
