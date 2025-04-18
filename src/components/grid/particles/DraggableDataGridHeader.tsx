"use client";

import React, { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { flexRender, Header } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { GridHead } from "@/components/ui/grid";
import { cn } from "@/lib/utils";
import DataGridFilter from "./DataGridFilter";

const DraggableDataGridHeader = <T,>({
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
    width: header.column.getSize() || 200,
    minWidth: header.column.getSize() || 200,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <GridHead
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("truncate py-2", {
        "bg-card shadow-xl/30 cursor-all-scroll": isDragging,
      })}
    >
      <div className="space-y-2">
        <div>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        <div>
          {header.column.getCanFilter() ? (
            <DataGridFilter column={header.column} />
          ) : null}
        </div>
      </div>
    </GridHead>
  );
};

export default DraggableDataGridHeader;
