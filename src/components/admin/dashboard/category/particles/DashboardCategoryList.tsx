"use client";

import React, { CSSProperties } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  ColumnDef,
  Header,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// needed for table body level scope DnD setup
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

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableTableHeader = ({
  header,
}: {
  header: Header<Person, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button {...attributes} {...listeners}>
        🟰
      </button>
    </th>
  );
};

const DragAlongCell = ({ cell }: { cell: Cell<Person, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

type Person = {
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
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        sortUndefined: "last",
        sortDescFirst: false,
      },
      {
        accessorKey: "age",
        header: () => "Age",
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        sortUndefined: "last",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
      },
      {
        accessorKey: "rank",
        header: "Rank",
        invertSorting: true,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
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

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  return (
    <Card>
      <CardHeader className="border-b border-border p-4 lg:p-5">
        <CardTitle>Category List</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-5">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <DraggableTableHeader key={header.id} header={header} />
                    ))}
                  </SortableContext>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      <DragAlongCell key={cell.id} cell={cell} />
                    </SortableContext>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default DashboardCategoryList;
