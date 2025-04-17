"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useDataGrid } from "@/context/data-grid-context";

function DataGridHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { headerRef } = useDataGrid();
  return (
    <div
      ref={headerRef}
      className={cn(
        "w-full bg-muted overflow-hidden reserve-scrollbar-space scrollbar-none border-b border-border",
        className
      )}
      {...props}
    />
  );
}

function DataGridBody({ className, ...props }: React.ComponentProps<"div">) {
  const { headerRef, bodyRef } = useDataGrid();
  return (
    <div
      ref={bodyRef}
      className={cn("w-full overflow-auto", className)}
      onScroll={() => {
        if (headerRef.current && bodyRef.current) {
          headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
        }
      }}
      {...props}
    />
  );
}

export { DataGridHeader, DataGridBody };
