import { flexRender, HeaderGroup } from "@tanstack/react-table";
import React from "react";
import { Grid, GridHead, GridHeader, GridRow } from "../ui/grid";
import { useDataGrid } from "@/context/data-grid-context";
import { cn } from "@/lib/utils";

interface DataGridHeaderProps<T> {
  headerGroup: HeaderGroup<T>[];
}

const DataGridHeader = <T,>({ headerGroup }: DataGridHeaderProps<T>) => {
  const { gridHeaderRef } = useDataGrid();

  return (
    <div
      ref={gridHeaderRef}
      className={cn(
        "w-full bg-muted overflow-hidden reserve-scrollbar-space scrollbar-none border-b border-border"
      )}
    >
      <Grid className="w-full table-fixed">
        <colgroup>
          {headerGroup.map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <col
                    key={header.id}
                    style={{
                      minWidth: header.getSize() || 200,
                      width: header.getSize() || 200,
                    }}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </colgroup>
        <GridHeader>
          {headerGroup.map((headerGroup) => (
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
                      width: header.getSize(),
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
