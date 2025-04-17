import { Grid, GridHeader, GridRow } from "@/components/ui/grid";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import DraggableDataGridHeader from "./DraggableDataGridHeader";
import { useDataGrid } from "@/context/data-grid-context";
import { cn } from "@/lib/utils";

const DataGridHeader = () => {
  const { table, columnOrder, headerRef } = useDataGrid();
  return (
    <div
      className={cn(
        "w-full bg-muted overflow-hidden reserve-scrollbar-space scrollbar-none border-b border-border"
      )}
      ref={headerRef}
    >
      <Grid className="w-full table-fixed">
        <GridHeader className="h-12">
          {table.getHeaderGroups().map((headerGroup) => (
            <GridRow
              key={headerGroup.id}
              className="*:border-r *:border-border *:last:border-none border-none"
            >
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <DraggableDataGridHeader key={header.id} header={header} />
                ))}
              </SortableContext>
            </GridRow>
          ))}
        </GridHeader>
      </Grid>
    </div>
  );
};

export default DataGridHeader;
