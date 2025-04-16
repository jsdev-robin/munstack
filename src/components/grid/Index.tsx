"use client";

import React from "react";
import { DataGridPrivider } from "@/context/data-grid-context";
import { Table } from "@tanstack/react-table";

import { Grid, GridBody, GridHeader, GridRow } from "../ui/grid";
import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";
// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableDataGridHeader from "./particles/DraggableDataGridHeader";
import DragDataGridAlongCell from "./particles/DragDataGridAlongCell";

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
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DataGridPrivider
      table={table}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
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
                      <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {headerGroup.headers.map((header) => (
                          <DraggableDataGridHeader
                            key={header.id}
                            header={header}
                          />
                        ))}
                      </SortableContext>
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
                    );
                  })}
                </GridBody>
              </Grid>
            </DataGridBody>
          </div>
        </div>
      </DndContext>
    </DataGridPrivider>
  );
};

export default DataGrid;
