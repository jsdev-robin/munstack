"use client";

import React from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Table } from "@tanstack/react-table";
import DragDataGridAlongCell from "./particles/DragDataGridAlongCell";
import DraggableDataGridHeader from "./particles/DraggableDataGridHeader";
import { Grid, GridBody, GridHeader, GridRow } from "../ui/grid";

export interface DataGridProps<T> {
  table: Table<T>;
  columnOrder: string[];
}

const DataGrid = <T,>({ table, columnOrder }: DataGridProps<T>) => {
  return (
    <Grid>
      <GridHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <GridRow key={headerGroup.id}>
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
      <GridBody>
        {table.getRowModel().rows.map((row) => (
          <GridRow key={row.id}>
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
  );
};

export default DataGrid;
