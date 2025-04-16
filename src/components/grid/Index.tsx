import React from "react";
import { DataGridPrivider } from "@/context/data-grid-context";
import { Table } from "@tanstack/react-table";
import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";

export interface DataGridProps<T> {
  table: Table<T>;
}

const DataGrid = <T,>({ table }: DataGridProps<T>) => {
  return (
    <DataGridPrivider table={table}>
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
