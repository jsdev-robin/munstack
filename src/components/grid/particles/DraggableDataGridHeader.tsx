"use client";

import React, { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { flexRender, Header } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { GridHead } from "@/components/ui/grid";
import { GripHorizontal } from "lucide-react";
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
      className={cn("truncate group p-2 capitalize", {
        "bg-card shadow-xl/30": isDragging,
      })}
    >
      <div className="space-y-2">
        <div className={cn("flex items-center justify-between")}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          <button
            {...attributes}
            {...listeners}
            className={cn(
              "cursor-all-scroll opacity-0 group-hover:opacity-100"
            )}
          >
            <GripHorizontal size={20} />
          </button>
        </div>
        {header.column.getCanFilter() ? (
          <div>
            <DataGridFilter column={header.column} />
          </div>
        ) : null}
      </div>
    </GridHead>
  );
};

export default DraggableDataGridHeader;
