"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Grid({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="grid"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  );
}

function GridHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="grid-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function GridBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="grid-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function GridFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="grid-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function GridRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="grid-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function GridHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="grid-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function GridCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="grid-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function GridCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="grid-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Grid,
  GridHeader,
  GridBody,
  GridFooter,
  GridHead,
  GridRow,
  GridCell,
  GridCaption,
};
