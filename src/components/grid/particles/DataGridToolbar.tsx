"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Columns, Filter, Settings } from "lucide-react";

const DataGridToolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="bg-muted flex">
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
              "writing-mode-vertical-lr rounded-none  h-auto w-full hover:bg-card",
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
