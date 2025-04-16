import { useState, useCallback, useMemo } from "react";

export interface UseRowSelectionParams {
  data: unknown[];
  initialSelected?: Set<number>;
  maxSelectable?: number;
  selectedField?: string | undefined;
}

const useRowSelection = ({
  data,
  selectedField,
  initialSelected = new Set<number>(),
  maxSelectable = Infinity,
}: UseRowSelectionParams) => {
  const [selected, setSelected] = useState<Set<number>>(initialSelected);

  const toggleSelection = useCallback(
    (index: number) => {
      setSelected((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(index)) {
          newSelected.delete(index);
        } else {
          if (newSelected.size < maxSelectable) {
            newSelected.add(index);
          }
        }
        return newSelected;
      });
    },
    [maxSelectable]
  );

  const selectAll = useCallback(() => {
    setSelected(new Set(Array.from({ length: data.length }, (_, idx) => idx)));
  }, [data]);

  const deselectAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  const invertSelection = useCallback(() => {
    setSelected((prevSelected) => {
      const newSelected = new Set<number>();
      for (let i = 0; i < data.length; i++) {
        if (!prevSelected.has(i)) {
          newSelected.add(i);
        }
      }
      return newSelected;
    });
  }, [data]);

  const isSelected = useCallback(
    (index: number) => selected.has(index),
    [selected]
  );

  const isAllSelected = useMemo(
    () => selected.size === data.length,
    [selected, data]
  );

  const isAnySelected = useMemo(() => selected.size > 0, [selected]);

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        selectAll();
      } else {
        deselectAll();
      }
    },
    [selectAll, deselectAll]
  );

  const selectedData = useMemo(() => {
    const result: unknown[] = [];
    selected.forEach((index) => result.push(data[index]));
    return result;
  }, [selected, data]);

  const selectedFieldData = useMemo(() => {
    return selectedField
      ? Array.from(selected)
          .map(
            (index) =>
              (data[index] as { [key: string]: unknown })?.[selectedField]
          )
          .filter(Boolean)
      : [];
  }, [selected, data, selectedField]);

  return {
    selected,
    toggleSelection,
    isSelected,
    isAllSelected,
    isAnySelected,
    selectedCount: selected.size,
    maxSelectable,
    handleSelectChange,
    selectAll,
    deselectAll,
    invertSelection,
    selectedData,
    selectedFieldData,
  };
};

export default useRowSelection;
