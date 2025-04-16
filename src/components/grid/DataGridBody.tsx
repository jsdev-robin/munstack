"use client";

import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Grid, GridBody, GridCell, GridRow } from "../ui/grid";
import { useDataGrid } from "@/context/data-grid-context";
import { cn } from "@/lib/utils";

const DataGridBody = () => {
  const { table, headerRef, bodyRef } = useDataGrid();
  return (
    <div
      ref={bodyRef}
      className={cn("w-full overflow-auto")}
      style={{ maxHeight: "70vh" }}
      onScroll={() => {
        if (headerRef.current && bodyRef.current) {
          const scrollLeft = bodyRef.current.scrollLeft;
          headerRef.current.scrollLeft = scrollLeft;
        }
      }}
    >
      <Grid className="w-full table-fixed">
        <GridBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <GridRow key={row.id} className="*:border-r *:border-border">
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
  );
};

export default DataGridBody;
