import { useMemo } from "react";

interface Option {
  value: string;
  label: string;
  img?: {
    src: string; // Image source URL
  };
}

interface FormatOptionsProps<T> {
  data?: T[];
  value?: keyof T;
  label?: keyof T;
  img?: string; // Key for the image URL in the data (e.g., "img" or "user.img.src")
  options?: Option;
}

export const useFormatOptions = <T extends Record<string, unknown>>({
  data,
  value,
  label,
  img, // Key for the image URL (flat or nested)
  options,
}: FormatOptionsProps<T>): Option[] => {
  return useMemo(() => {
    if (!data || !value || !label) {
      return options ? [options] : [];
    }

    const seenValues = new Set<string>();
    const uniqueOptions: Option[] = [];

    data.forEach((item) => {
      const val = String(item[value]).toLowerCase();
      const lbl = String(item[label]);

      // Extract image URL (flat or nested)
      let imageSrc: string | undefined;
      if (img) {
        const keys = img.split("."); // Split key path (e.g., "user.img.src")
        let nestedValue: unknown = item;

        // Traverse the nested object (if applicable)
        for (const key of keys) {
          if (
            nestedValue &&
            typeof nestedValue === "object" &&
            key in (nestedValue as Record<string, unknown>)
          ) {
            nestedValue = (nestedValue as Record<string, unknown>)[key];
          } else {
            nestedValue = undefined;
            break;
          }
        }

        // Handle flat `img` field
        if (typeof nestedValue === "string") {
          imageSrc = nestedValue;
        } else if (keys.length === 1 && typeof item[img] === "string") {
          // Fallback for flat `img` field
          imageSrc = item[img] as string;
        }
      }

      if (!seenValues.has(val)) {
        seenValues.add(val);
        uniqueOptions.push({
          value: val,
          label: lbl,
          img: imageSrc ? { src: imageSrc } : undefined, // Include image if available
        });
      }
    });

    return options ? [options, ...uniqueOptions] : uniqueOptions;
  }, [data, value, label, img, options]); // Add `img` to the dependency array
};
