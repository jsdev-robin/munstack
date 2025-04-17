"use client";

import React, { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Cell, flexRender } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { GridCell } from "@/components/ui/grid";

const DragDataGridAlongCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
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
    <GridCell style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </GridCell>
  );
};

export default DragDataGridAlongCell;
