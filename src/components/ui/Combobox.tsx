"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Options {
  label: string;
  value: string;
  img?: {
    src?: string;
  };
}

interface ComboboxProps {
  options: Options[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  onChange,
  defaultValue = "",
  placeholder = "Select option",
  className,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          data-expanded={open}
          className={cn(
            "w-full justify-start dark:bg-input/30 capitalize data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px]",
            className
          )}
          disabled={disabled}
        >
          {value ? (
            <>
              {options.find((option) => option.value === value)?.img && (
                <Avatar className="size-5">
                  <AvatarImage
                    src={
                      options.find((option) => option.value === value)?.img?.src
                    }
                  />
                  <AvatarFallback>
                    {options.find((option) => option.value === value)?.label[0]}
                  </AvatarFallback>
                </Avatar>
              )}

              {options.find((option) => option.value === value)?.label}
            </>
          ) : (
            <span className="text-muted-foreground">
              {placeholder || (options.length === 0 && placeholder)}
            </span>
          )}
          <ChevronsUpDown className="text-muted-foreground ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          {options.length > 10 && (
            <CommandInput placeholder="Search options..." />
          )}
          <CommandList className="whisper-poem poem-thin">
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="capitalize"
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    if (onChange) {
                      onChange(currentValue === value ? "" : currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {option.img && (
                    <Avatar className="size-5">
                      <AvatarImage src={option.img?.src} />
                      <AvatarFallback>{option.label[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
