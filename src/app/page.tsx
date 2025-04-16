"use client";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

import React from "react";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const Home = () => {
  return (
    <div className="p-4">
      <table className="table-auto border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Main Column 1</th>
            <th className="border px-4 py-2">Main Column 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Main Row 1</td>
            <td className="border px-4 py-2">
              {/* Nested Table */}
              <table className="table-auto border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-3 py-1 text-sm">Nested Col 1</th>
                    <th className="border px-3 py-1 text-sm">Nested Col 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-1 text-sm">Nested Row 1</td>
                    <td className="border px-3 py-1 text-sm">Info</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1 text-sm">Nested Row 2</td>
                    <td className="border px-3 py-1 text-sm">More Info</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
