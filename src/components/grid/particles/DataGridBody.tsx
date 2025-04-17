import React from "react";
import { Grid, GridBody, GridRow } from "@/components/ui/grid";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDataGrid } from "@/context/data-grid-context";
import DragDataGridAlongCell from "./DragDataGridAlongCell";
import { cn } from "@/lib/utils";

const DataGridBody = () => {
  const { table, columnOrder, headerRef, bodyRef } = useDataGrid();

  return (
    <div
      className={cn("w-full overflow-auto")}
      style={{ maxHeight: "70vh", height: "70vh" }}
      ref={bodyRef}
      onScroll={() => {
        if (headerRef.current && bodyRef.current) {
          const scrollLeft = bodyRef.current.scrollLeft;
          headerRef.current.scrollLeft = scrollLeft;
        }
      }}
    >
      <Grid className="w-full table-fixed">
        <GridBody>
          {table.getRowModel().rows.map((row) => (
            <GridRow key={row.id} className="*:border-r *:border-border">
              {row.getVisibleCells().map((cell) => (
                <SortableContext
                  key={cell.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <DragDataGridAlongCell key={cell.id} cell={cell} />
                </SortableContext>
              ))}
            </GridRow>
          ))}
        </GridBody>
      </Grid>
    </div>
  );
};

export default DataGridBody;
