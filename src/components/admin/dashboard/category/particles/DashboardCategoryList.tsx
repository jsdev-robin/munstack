"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataGrid from "@/components/grid/Index";
import DataGridIndeterminateCheckbox from "@/components/grid/particles/DataGridIndeterminateCheckbox";
import { dummyPeople, Person } from "@/data/dummyPeople";

const DashboardCategoryList = () => {
  const columns = React.useMemo<ColumnDef<Person, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div>
            <DataGridIndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div>
            <DataGridIndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
              aria-label="Select row"
            />
          </div>
        ),
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        id: "firstName",
      },
      {
        accessorFn: (row) => row.lastName,
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        id: "lastName",
      },
      {
        accessorKey: "age",
        header: () => "Age",
        id: "age",
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        id: "visits",
      },
      {
        accessorKey: "status",
        header: "Status",
        id: "status",
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        id: "progress",
      },
      {
        accessorKey: "rank",
        header: "Profile rank",
        id: "rank",
      },
      {
        accessorKey: "phone",
        header: "Profile phone",
        id: "phone",
      },
      {
        accessorKey: "createdAt",
        header: "Profile createdAt",
        id: "createdAt",
      },
    ],
    []
  );

  const [data] = React.useState(dummyPeople);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!)
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      columnOrder,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log(table.getRowModel().rows);

  return (
    <Card>
      <CardHeader className="border-b border-border p-4 lg:p-5">
        <CardTitle>Category List</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-5">
        <DataGrid
          table={table}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          toolbar={true}
        />
      </CardContent>
    </Card>
  );
};

export default DashboardCategoryList;
