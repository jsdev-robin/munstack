"use client";

import React from "react";
import { useDataGrid } from "@/context/data-grid-context";
import { cn } from "@/lib/utils";

interface DataGridHeaderProps {
  children: React.ReactNode;
}

const DataGridHeader: React.FC<DataGridHeaderProps> = ({ children }) => {
  const { headerRef } = useDataGrid();

  return (
    <div
      ref={headerRef}
      className={cn(
        "w-full bg-muted overflow-hidden reserve-scrollbar-space scrollbar-none border-b border-border"
      )}
    >
      {children}
    </div>
  );
};

export default DataGridHeader;
