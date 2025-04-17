"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { DataGridPrivider } from "@/context/data-grid-context";
import DataGridHeader from "./particles/DataGridHeader";
import DataGridBody from "./particles/DataGridBody";
import DataGridDnd from "./particles/DataGridDnd";
import DataGridToolbar from "./particles/DataGridToolbar";

export interface DataGridProps<T> {
  table: Table<T>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  toolbar?: boolean;
}

const DataGrid = <T,>({
  table,
  columnOrder,
  setColumnOrder,
  toolbar,
}: DataGridProps<T>) => {
  return (
    <DataGridPrivider
      table={table}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
    >
      <DataGridDnd>
        <div className="flex relative rounded-md overflow-hidden border border-border">
          <div className="overflow-hidden flex-1">
            <DataGridHeader />
            <DataGridBody />
          </div>
          {toolbar && <DataGridToolbar />}
        </div>
      </DataGridDnd>
    </DataGridPrivider>
  );
};

export default DataGrid;
