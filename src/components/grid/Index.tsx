"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { DataGridPrivider } from "@/context/data-grid-context";
import DataGridHeader from "./particles/DataGridHeader";
import DataGridBody from "./particles/DataGridBody";

export interface DataGridProps<T> {
  table: Table<T>;
  columnOrder: string[];
}

const DataGrid = <T,>({ table, columnOrder }: DataGridProps<T>) => {
  return (
    <DataGridPrivider table={table} columnOrder={columnOrder}>
      <div className="flex relative rounded-md overflow-hidden border border-border">
        <div className="overflow-hidden flex-1">
          <DataGridHeader />
          <DataGridBody />
        </div>
      </div>
    </DataGridPrivider>
  );
};

export default DataGrid;
