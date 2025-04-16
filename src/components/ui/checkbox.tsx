import { cn } from "@/lib/utils";
import React, { forwardRef, InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        id={id}
        ref={ref}
        className={cn(
          "border border-input rounded-sm disabled:opacity-50 disabled:pointer-events-none bg-background focus:ring-offset-background focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
