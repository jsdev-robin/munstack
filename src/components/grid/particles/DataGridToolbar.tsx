"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Columns, Filter, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Checkbox from "@/components/ui/checkbox";
import { useDataGrid } from "@/context/data-grid-context";

const DataGridToolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { table } = useDataGrid();

  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  // Filter columns based on search term
  const filteredColumns = table.getAllLeafColumns().filter((column) => {
    return column.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-muted flex">
      {activePanel === "columns" && (
        <div className={cn("w-60 border-l border-border transition-all")}>
          <div className="h-[48.5px] border-b border-border flex items-center px-2">
            <div className="flex items-center gap-2">
              <Switch />
              <Label>Pivot Mode</Label>
            </div>
          </div>
          <div className="space-y-2">
            <div className="p-2 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  {...{
                    checked: table.getIsAllColumnsVisible(),
                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                  }}
                />
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                  {table.getVisibleLeafColumns().length}
                </Badge>
              </div>
              <Input
                className="h-8"
                placeholder="Search columns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-64 overflow-y-auto border-b border-border">
              <div className="space-y-4 px-2 py-1">
                {filteredColumns.length > 0 ? (
                  filteredColumns.map((column) => (
                    <div key={column.id} className="px-1">
                      <Label>
                        <Checkbox
                          {...{
                            type: "checkbox",
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />{" "}
                        <span className="truncate">{column.id}</span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No columns found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-10 border-l border-border">
        {[
          { value: "columns", label: "Columns", icon: Columns },
          { value: "toolbar", label: "Toolbar", icon: Settings },
          { value: "filter", label: "Filter", icon: Filter },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            className={cn(
              "writing-mode-vertical-lr rounded-none h-auto w-full hover:bg-card",
              activePanel === value && "bg-card"
            )}
            onClick={() => togglePanel(value)}
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DataGridToolbar;
