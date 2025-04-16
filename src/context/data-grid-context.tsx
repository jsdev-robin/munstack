"use client";

import React, { createContext, useContext, useRef } from "react";

interface DataGridContextValue {
  gridHeaderRef: React.RefObject<HTMLDivElement | null>;
  gridBodyRef: React.RefObject<HTMLDivElement | null>;
}

const DataGridContext = createContext<DataGridContextValue | null>(null);

export const DataGridPrivider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const gridHeaderRef = useRef<HTMLDivElement>(null);
  const gridBodyRef = useRef<HTMLDivElement>(null);

  console.log(gridBodyRef);

  return (
    <DataGridContext.Provider
      value={{
        gridHeaderRef,
        gridBodyRef,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export function useDataGrid() {
  const context = useContext(
    DataGridContext as React.Context<DataGridContextValue | null>
  );

  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridPrivider");
  }
  return context;
}

export default DataGridContext;
