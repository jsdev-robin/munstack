"use client";

import React, { CSSProperties } from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Cell, flexRender, Header, Table } from "@tanstack/react-table";

export interface DataGridProps<T> {
  table: Table<T>;
  columnOrder: string[];
}

const DataGrid = <T,>({ table, columnOrder }: DataGridProps<T>) => {
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            <SortableContext
              items={columnOrder}
              strategy={horizontalListSortingStrategy}
            >
              {headerGroup.headers.map((header) => (
                <DraggableTableHeader key={header.id} header={header} />
              ))}
            </SortableContext>
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <SortableContext
                key={cell.id}
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                <DragAlongCell key={cell.id} cell={cell} />
              </SortableContext>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
    transform: CSS.Translate.toString(transform),
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
        🟰
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
    transform: CSS.Translate.toString(transform),
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

export default DataGrid;
