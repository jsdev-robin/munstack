"use client";

import React, { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { flexRender, Header } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { GridHead } from "@/components/ui/grid";
import { GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      className={cn("group truncate", {
        "bg-card shadow-xl/30": isDragging,
      })}
    >
      <div className={cn("flex items-center justify-between")}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <Button
          {...attributes}
          {...listeners}
          className={cn("hidden group-hover:inline-flex", {
            "cursor-all-scroll": isDragging,
          })}
          size="icon"
          variant="ghost"
        >
          <GripHorizontal size={20} />
        </Button>
      </div>
    </GridHead>
  );
};

export default DraggableDataGridHeader;
