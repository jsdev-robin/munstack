"use client";

import React, { CSSProperties } from "react";
import { DataGridPrivider } from "@/context/data-grid-context";
import { Cell, flexRender, Header, Table } from "@tanstack/react-table";

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

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";

export interface DataGridProps<T> {
  table: Table<T>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

const DraggableTableHeader = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button {...attributes} {...listeners}>
        <Grip />
      </button>
    </th>
  );
};

const DragAlongCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

const DataGrid = <T,>({
  table,
  columnOrder,
  setColumnOrder,
}: DataGridProps<T>) => {
  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      if (setColumnOrder) {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);
          return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
        });
      }
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
                      <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {headerGroup.headers.map((header) => (
                          <DraggableTableHeader
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
                            <DragAlongCell key={cell.id} cell={cell} />
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
      </DataGridPrivider>
    </DndContext>
  );
};

export default DataGrid;
