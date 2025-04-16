"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import DataGridHeader from "@/components/grid/DataGridHeader";
import DataGridBody from "@/components/grid/DataGridBody";
import { DataGridPrivider } from "@/context/data-grid-context";
import DraggableDataGridHeader from "../../../../grid/particles/DraggableDataGridHeader";
import DragDataGridAlongCell from "@/components/grid/particles/DragDataGridAlongCell";
import { Grid, GridBody, GridHeader, GridRow } from "@/components/ui/grid";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const people: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 28,
    visits: 15,
    progress: 75,
    status: "single",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    age: 34,
    visits: 28,
    progress: 90,
    status: "relationship",
    subRows: [
      {
        firstName: "Emma",
        lastName: "Smith",
        age: 5,
        visits: 2,
        progress: 10,
        status: "single",
      },
    ],
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    age: 42,
    visits: 7,
    progress: 50,
    status: "complicated",
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    age: 25,
    visits: 12,
    progress: 60,
    status: "single",
  },
  {
    firstName: "David",
    lastName: "Brown",
    age: 38,
    visits: 25,
    progress: 85,
    status: "relationship",
    subRows: [
      {
        firstName: "Sophia",
        lastName: "Brown",
        age: 8,
        visits: 3,
        progress: 15,
        status: "single",
      },
      {
        firstName: "Liam",
        lastName: "Brown",
        age: 6,
        visits: 1,
        progress: 8,
        status: "single",
      },
    ],
  },
  {
    firstName: "Sarah",
    lastName: "Miller",
    age: 31,
    visits: 14,
    progress: 72,
    status: "single",
  },
  {
    firstName: "Robert",
    lastName: "Wilson",
    age: 50,
    visits: 30,
    progress: 95,
    status: "relationship",
  },
  {
    firstName: "Jennifer",
    lastName: "Taylor",
    age: 27,
    visits: 9,
    progress: 55,
    status: "complicated",
  },
  {
    firstName: "Thomas",
    lastName: "Anderson",
    age: 33,
    visits: 20,
    progress: 82,
    status: "single",
    subRows: [
      {
        firstName: "Olivia",
        lastName: "Anderson",
        age: 3,
        visits: 0,
        progress: 5,
        status: "single",
      },
    ],
  },
  {
    firstName: "Lisa",
    lastName: "Thomas",
    age: 41,
    visits: 12,
    progress: 68,
    status: "relationship",
  },
  {
    firstName: "James",
    lastName: "Jackson",
    age: 36,
    visits: 17,
    progress: 79,
    status: "single",
  },
  {
    firstName: "Amanda",
    lastName: "White",
    age: 29,
    visits: 11,
    progress: 63,
    status: "complicated",
    subRows: [
      {
        firstName: "Noah",
        lastName: "White",
        age: 4,
        visits: 1,
        progress: 12,
        status: "single",
      },
    ],
  },
  {
    firstName: "Christopher",
    lastName: "Harris",
    age: 39,
    visits: 23,
    progress: 87,
    status: "relationship",
  },
  {
    firstName: "Elizabeth",
    lastName: "Martin",
    age: 26,
    visits: 8,
    progress: 52,
    status: "single",
  },
  {
    firstName: "Daniel",
    lastName: "Thompson",
    age: 44,
    visits: 27,
    progress: 91,
    status: "relationship",
    subRows: [
      {
        firstName: "Ava",
        lastName: "Thompson",
        age: 9,
        visits: 4,
        progress: 25,
        status: "single",
      },
      {
        firstName: "Mason",
        lastName: "Thompson",
        age: 7,
        visits: 2,
        progress: 18,
        status: "single",
      },
    ],
  },
  {
    firstName: "Jessica",
    lastName: "Garcia",
    age: 30,
    visits: 16,
    progress: 77,
    status: "complicated",
  },
  {
    firstName: "Andrew",
    lastName: "Martinez",
    age: 35,
    visits: 19,
    progress: 81,
    status: "single",
  },
  {
    firstName: "Nicole",
    lastName: "Robinson",
    age: 31,
    visits: 13,
    progress: 70,
    status: "relationship",
  },
  {
    firstName: "Kevin",
    lastName: "Clark",
    age: 37,
    visits: 21,
    progress: 84,
    status: "single",
    subRows: [
      {
        firstName: "Charlotte",
        lastName: "Clark",
        age: 5,
        visits: 2,
        progress: 10,
        status: "single",
      },
    ],
  },
  {
    firstName: "Stephanie",
    lastName: "Rodriguez",
    age: 28,
    visits: 10,
    progress: 58,
    status: "complicated",
  },
];

const CategoryTableDrag = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        id: "firstName",
        size: 150,
      },
      {
        accessorFn: (row) => row.lastName,
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        id: "lastName",
        size: 150,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        id: "age",
        size: 120,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        id: "visits",
        size: 120,
      },
      {
        accessorKey: "status",
        header: "Status",
        id: "status",
        size: 150,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        id: "progress",
        size: 180,
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
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  return (
    <DataGridPrivider
      table={table}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
    >
      <Card>
        <CardHeader className="border-b border-border p-4 lg:p-5">
          <div className="flex items-center gap-2">
            <CardTitle>Category list</CardTitle>
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
              8
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 lg:p-5">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <div className="flex relative rounded-md overflow-hidden border border-border">
              <div className="overflow-hidden flex-1">
                <DataGridHeader>
                  <Grid className="w-full table-fixed">
                    <GridHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <GridRow
                          key={headerGroup.id}
                          className="*:border-r *:border-border *:last:border-none border-none"
                        >
                          <SortableContext
                            items={columnOrder}
                            strategy={horizontalListSortingStrategy}
                          >
                            {headerGroup.headers.map((header) => (
                              <DraggableDataGridHeader
                                key={header.id}
                                header={header}
                              />
                            ))}
                          </SortableContext>
                        </GridRow>
                      ))}
                    </GridHeader>
                  </Grid>
                </DataGridHeader>
                <DataGridBody>
                  <Grid className="w-full table-fixed">
                    <GridBody>
                      {table.getRowModel().rows.map((row) => (
                        <GridRow
                          key={row.id}
                          className="*:border-r *:border-border"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <SortableContext
                              key={cell.id}
                              items={columnOrder}
                              strategy={horizontalListSortingStrategy}
                            >
                              <DragDataGridAlongCell
                                key={cell.id}
                                cell={cell}
                              />
                            </SortableContext>
                          ))}
                        </GridRow>
                      ))}
                    </GridBody>
                  </Grid>
                </DataGridBody>
              </div>
            </div>
          </DndContext>
        </CardContent>
      </Card>
    </DataGridPrivider>
  );
};

export default CategoryTableDrag;
