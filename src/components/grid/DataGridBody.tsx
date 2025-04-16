"use client";

import React from "react";
import { useDataGrid } from "@/context/data-grid-context";
import { cn } from "@/lib/utils";

interface DataGridBodyProps {
  children: React.ReactNode;
}

const DataGridBody: React.FC<DataGridBodyProps> = ({ children }) => {
  const { headerRef, bodyRef } = useDataGrid();

  return (
    <div
      ref={bodyRef}
      className={cn("w-full overflow-auto")}
      style={{ maxHeight: "70vh" }}
      onScroll={() => {
        if (headerRef.current && bodyRef.current) {
          headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
        }
      }}
    >
      {children}
    </div>
  );
};

export default DataGridBody;
