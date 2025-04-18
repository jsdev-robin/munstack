"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DataGridDebouncedInput from "./DataGridDebouncedInput";
import { Column } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataGridFilter: React.FC<{ column: Column<any, unknown> }> = ({
  column,
}) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
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
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <>
      <Select
        onValueChange={(value) => column.setFilterValue(String(value))}
        value={columnFilterValue?.toString()}
      >
        <SelectTrigger className="w-full" size="sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="complicated">complicated</SelectItem>
          <SelectItem value="relationship">relationship</SelectItem>
          <SelectItem value="single">single</SelectItem>
        </SelectContent>
      </Select>
    </>
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
