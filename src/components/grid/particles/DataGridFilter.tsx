"use client";

import React from "react";
import { Column, RowData } from "@tanstack/react-table";
import DataGridDebouncedInput from "./DataGridDebouncedInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

interface DataGridFilterProps<T> {
  column: Column<T, unknown>;
}

const DataGridFilter = <T,>({ column }: DataGridFilterProps<T>) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex gap-2">
        <DataGridDebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder="Min"
          className="h-8"
        />
        <DataGridDebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder="Max"
          className="h-8"
        />
      </div>
    </div>
  ) : filterVariant === "select" ? (
    <Select
      value={columnFilterValue?.toString() || "all"}
      onValueChange={(value) => {
        column.setFilterValue(value === "all" ? undefined : value);
      }}
    >
      <SelectTrigger className="w-full" size="sm">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="complicated">Complicated</SelectItem>
        <SelectItem value="relationship">Relationship</SelectItem>
        <SelectItem value="single">Single</SelectItem>
      </SelectContent>
    </Select>
  ) : (
    <DataGridDebouncedInput
      className="h-8"
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Search..."
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
};

export default DataGridFilter;
