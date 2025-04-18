"use client";

import Checkbox from "@/components/ui/checkbox";
import React, { HTMLProps, useEffect, useRef } from "react";

const DataGridIndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return <Checkbox type="checkbox" ref={ref} {...rest} />;
};

export default DataGridIndeterminateCheckbox;
