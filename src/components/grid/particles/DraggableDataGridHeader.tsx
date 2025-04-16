import React, { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { flexRender, Header } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";

const DraggableDataGridHeader = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
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
        <Grip size={14} />
      </button>
    </th>
  );
};
export default DraggableDataGridHeader;
