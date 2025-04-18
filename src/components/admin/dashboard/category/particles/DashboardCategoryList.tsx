"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataGrid from "@/components/grid/Index";
import DataGridIndeterminateCheckbox from "@/components/grid/particles/DataGridIndeterminateCheckbox";

export type Person = {
  firstName: string;
  lastName: string | undefined;
  age: number;
  visits: number | undefined;
  progress: number;
  status: "relationship" | "complicated" | "single";
  rank: number;
  createdAt: Date;
  subRows?: Person[];
  email?: string;
  phone?: string;
  address?: string;
  isVerified?: boolean;
};

const people: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 28,
    visits: 15,
    progress: 75,
    status: "single",
    rank: 3,
    createdAt: new Date("2023-01-15"),
    email: "john.doe@example.com",
    phone: "555-0101",
    isVerified: true,
    subRows: [
      {
        firstName: "John Jr.",
        lastName: "Doe",
        age: 5,
        visits: 2,
        progress: 10,
        status: "single",
        rank: 20,
        createdAt: new Date("2023-05-10"),
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        age: 27,
        visits: 8,
        progress: 65,
        status: "relationship",
        rank: 4,
        createdAt: new Date("2023-02-18"),
        email: "jane.doe@example.com",
      },
    ],
  },
  {
    firstName: "Sarah",
    lastName: "Johnson",
    age: 32,
    visits: 22,
    progress: 88,
    status: "complicated",
    rank: 2,
    createdAt: new Date("2022-12-05"),
    address: "456 Oak Ave, Somewhere",
    subRows: [
      {
        firstName: "Tom",
        lastName: "Johnson",
        age: 34,
        visits: 30,
        progress: 92,
        status: "relationship",
        rank: 1,
        createdAt: new Date("2022-11-15"),
      },
    ],
  },
  {
    firstName: "Robert",
    lastName: "Brown",
    age: 45,
    visits: 5,
    progress: 40,
    status: "single",
    rank: 7,
    createdAt: new Date("2023-04-20"),
    phone: "555-0303",
  },
  {
    firstName: "Lisa",
    lastName: "Davis",
    age: 29,
    visits: 18,
    progress: 78,
    status: "relationship",
    rank: 3,
    createdAt: new Date("2023-01-30"),
    email: "lisa.davis@example.com",
    isVerified: true,
  },
  {
    firstName: "David",
    lastName: "Miller",
    age: 38,
    visits: 25,
    progress: 85,
    status: "complicated",
    rank: 2,
    createdAt: new Date("2022-10-12"),
    address: "789 Pine Rd, Nowhere",
    subRows: [
      {
        firstName: "Emma",
        lastName: "Miller",
        age: 8,
        visits: 3,
        progress: 15,
        status: "single",
        rank: 18,
        createdAt: new Date("2023-03-22"),
      },
      {
        firstName: "Olivia",
        lastName: "Miller",
        age: 6,
        visits: 1,
        progress: 8,
        status: "single",
        rank: 19,
        createdAt: new Date("2023-04-15"),
      },
    ],
  },
  {
    firstName: "Jennifer",
    lastName: "Wilson",
    age: 31,
    visits: 14,
    progress: 72,
    status: "single",
    rank: 5,
    createdAt: new Date("2023-02-28"),
    phone: "555-0404",
    isVerified: false,
  },
  {
    firstName: "Thomas",
    lastName: "Moore",
    age: 50,
    visits: 30,
    progress: 95,
    status: "relationship",
    rank: 1,
    createdAt: new Date("2022-09-15"),
    email: "thomas.moore@example.com",
    address: "321 Elm St, Anywhere",
  },
  {
    firstName: "Amanda",
    lastName: "Taylor",
    age: 27,
    visits: 9,
    progress: 55,
    status: "complicated",
    rank: 6,
    createdAt: new Date("2023-03-05"),
    phone: "555-0505",
  },
  {
    firstName: "James",
    lastName: "Anderson",
    age: 33,
    visits: 20,
    progress: 82,
    status: "single",
    rank: 4,
    createdAt: new Date("2022-11-30"),
    email: "james.anderson@example.com",
    isVerified: true,
    subRows: [
      {
        firstName: "Sophia",
        lastName: "Anderson",
        age: 3,
        visits: 0,
        progress: 5,
        status: "single",
        rank: 20,
        createdAt: new Date("2023-05-20"),
      },
    ],
  },
  {
    firstName: "Elizabeth",
    lastName: "Thomas",
    age: 41,
    visits: 12,
    progress: 68,
    status: "relationship",
    rank: 5,
    createdAt: new Date("2023-01-10"),
    address: "654 Cedar Ln, Somewhere",
  },
  {
    firstName: "Daniel",
    lastName: "Jackson",
    age: 36,
    visits: 17,
    progress: 79,
    status: "single",
    rank: 3,
    createdAt: new Date("2022-12-20"),
    phone: "555-0606",
    isVerified: false,
  },
  {
    firstName: "Michelle",
    lastName: "White",
    age: 29,
    visits: 11,
    progress: 63,
    status: "complicated",
    rank: 7,
    createdAt: new Date("2023-04-05"),
    email: "michelle.white@example.com",
  },
  {
    firstName: "Christopher",
    lastName: "Harris",
    age: 39,
    visits: 23,
    progress: 87,
    status: "relationship",
    rank: 2,
    createdAt: new Date("2022-10-25"),
    address: "987 Maple Dr, Nowhere",
    isVerified: true,
    subRows: [
      {
        firstName: "Ethan",
        lastName: "Harris",
        age: 9,
        visits: 4,
        progress: 25,
        status: "single",
        rank: 15,
        createdAt: new Date("2023-02-15"),
      },
      {
        firstName: "Mia",
        lastName: "Harris",
        age: 7,
        visits: 2,
        progress: 18,
        status: "single",
        rank: 17,
        createdAt: new Date("2023-03-10"),
      },
    ],
  },
  {
    firstName: "Ashley",
    lastName: "Martin",
    age: 26,
    visits: 8,
    progress: 52,
    status: "single",
    rank: 8,
    createdAt: new Date("2023-05-01"),
    phone: "555-0707",
  },
  {
    firstName: "Matthew",
    lastName: "Thompson",
    age: 44,
    visits: 27,
    progress: 91,
    status: "relationship",
    rank: 1,
    createdAt: new Date("2022-09-30"),
    email: "matthew.thompson@example.com",
    isVerified: true,
  },
  {
    firstName: "Jessica",
    lastName: "Garcia",
    age: 30,
    visits: 16,
    progress: 77,
    status: "complicated",
    rank: 4,
    createdAt: new Date("2023-01-25"),
    address: "135 Birch Blvd, Anywhere",
  },
  {
    firstName: "Andrew",
    lastName: "Martinez",
    age: 35,
    visits: 19,
    progress: 81,
    status: "single",
    rank: 3,
    createdAt: new Date("2022-12-15"),
    phone: "555-0808",
    isVerified: false,
    subRows: [
      {
        firstName: "Liam",
        lastName: "Martinez",
        age: 4,
        visits: 1,
        progress: 12,
        status: "single",
        rank: 19,
        createdAt: new Date("2023-04-22"),
      },
    ],
  },
  {
    firstName: "Nicole",
    lastName: "Robinson",
    age: 31,
    visits: 13,
    progress: 70,
    status: "relationship",
    rank: 5,
    createdAt: new Date("2023-02-10"),
    email: "nicole.robinson@example.com",
  },
  {
    firstName: "Kevin",
    lastName: "Clark",
    age: 37,
    visits: 21,
    progress: 84,
    status: "single",
    rank: 2,
    createdAt: new Date("2022-11-05"),
    address: "246 Spruce St, Somewhere",
    isVerified: true,
  },
  {
    firstName: "Stephanie",
    lastName: "Rodriguez",
    age: 28,
    visits: 10,
    progress: 58,
    status: "complicated",
    rank: 6,
    createdAt: new Date("2023-03-15"),
    phone: "555-0909",
  },
];

const DashboardCategoryList = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
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

  const [data] = React.useState(people);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

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
