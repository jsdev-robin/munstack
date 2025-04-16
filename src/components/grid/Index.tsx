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
import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";

export interface DataGridProps<T> {
  table: Table<T>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

const DataGrid = <T,>({
  table,
  columnOrder,
  setColumnOrder,
}: DataGridProps<T>) => {
  return (
    <DataGridPrivider
      table={table}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
    >
      <div className="flex relative rounded-md overflow-hidden border border-border">
        <div className="overflow-hidden flex-1">
          <DataGridHeader>
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
          </DataGridHeader>
          <DataGridBody>
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
          </DataGridBody>
        </div>
      </div>
    </DataGridPrivider>
  );
};

export default DataGrid;
