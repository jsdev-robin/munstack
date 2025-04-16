import React from "react";
import { flexRender, HeaderGroup, RowModel } from "@tanstack/react-table";
import { Grid, GridBody, GridCell, GridRow } from "../ui/grid";
import { useDataGrid } from "@/context/data-grid-context";
import { cn } from "@/lib/utils";

interface DataGridBodyProps<T> {
  rowModel: RowModel<T>;
  headerGroup: HeaderGroup<T>[];
}

const DataGridBody = <T,>({ rowModel, headerGroup }: DataGridBodyProps<T>) => {
  const { gridBodyRef, gridHeaderRef } = useDataGrid();

  const handleScroll = () => {
    if (gridHeaderRef.current && gridBodyRef.current) {
      const scrollLeft = gridBodyRef.current.scrollLeft;
      gridHeaderRef.current.scrollLeft = scrollLeft;
    }
  };

  return (
    <div
      ref={gridBodyRef}
      className={cn("w-full overflow-auto")}
      style={{ maxHeight: "70vh" }}
      onScroll={handleScroll}
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
        <GridBody>
          {rowModel.rows.map((row) => {
            return (
              <GridRow key={row.id} className="*:border-r *:border-border">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <GridCell key={cell.id} className="truncate">
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
