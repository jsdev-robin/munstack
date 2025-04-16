/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataGridProps } from "@/components/grid/Index";
import { Table } from "@tanstack/react-table";
import React, { createContext, useContext, useRef } from "react";

interface DataGridContextValue<T> {
  headerRef: React.RefObject<HTMLDivElement | null>;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  table: Table<T>;
}

const DataGridContext = createContext<DataGridContextValue<any> | null>(null);

interface MunGridProviderProps<T> extends DataGridProps<T> {
  children?: React.ReactNode;
}

export const DataGridPrivider = <T,>({
  children,
  table,
}: MunGridProviderProps<T>) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <DataGridContext.Provider
      value={{
        headerRef,
        bodyRef,
        table,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export function useDataGrid() {
  const context = useContext(
    DataGridContext as React.Context<DataGridContextValue<any> | null>
  );

  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridPrivider");
  }
  return context;
}

export default DataGridContext;
