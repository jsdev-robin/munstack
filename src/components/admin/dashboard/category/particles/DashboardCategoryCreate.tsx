"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMuntahaDrop } from "react-muntaha-uploader";
import { useFormatOptions } from "@/hooks/use-format-options";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/Combobox";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const categorySchema = z.object({
  categoryName: z.string().min(1, "Category Name is required"),
  priority: z.union([
    z.string().min(1, "Priority is required"),
    z.number().min(1, "Priority must be at least 1"),
  ]),
  img: z
    .custom<File>()
    .refine((file) => file instanceof File, "File is required")
    .refine(
      (file) => file && file.type.startsWith("image/"),
      "Only image files are allowed (jpg, png, etc.)"
    )
    .refine(
      (file) => file && file.size <= 1 * 1024 * 1024,
      "Maximum file size is 1MB"
    ),
});

const DashboardCategoryCreate = () => {
  const formatPriorityOption = useFormatOptions({
    data: Array.from({ length: 10 }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    })),
    label: "label",
    value: "value",
  });

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      categoryName: "",
      priority: "1",
      img: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof categorySchema>) {
    console.log(data);
  }

  const { getRootProps, getInputProps, onDelete, error } = useMuntahaDrop({
    accept: ["image/*"],
    maxSize: 1 * 1024 * 1024,
    multiple: false,
    onDrop: (file: File | null) => {
      if (file) {
        form.setValue("img", file);
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="border-b border-border p-4 lg:p-5">
            <CardTitle>Category Create</CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-5">
            <div className="space-y-4 lg:space-y-5">
              <div className="grid gap-4 lg:gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="space-y-4 lg:space-y-5">
                    <FormField
                      control={form.control}
                      name="categoryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <Combobox
                              options={formatPriorityOption}
                              {...field}
                              defaultValue={String(form.watch("priority"))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="img"
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Category Logo{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-green-500">
                              Ratio 1:1 (500 x 500 px)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...getInputProps()}
                              style={{
                                display: "block",
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="flex items-center justify-center h-full">
                    <div
                      {...getRootProps()}
                      className="w-44 h-44 rounded-md border border-border border-dashed flex items-center justify-center overflow-hidden data-[dragging=true]:border-green-500 data-[has-error=true]:border-red-500"
                    >
                      {form.watch("img") ? (
                        <Image
                          src={URL.createObjectURL(form.watch("img"))}
                          alt={form.watch("img").name.replace(/\.[^/.]+$/, "")}
                          width={100}
                          height={100}
                          className="w-full h-full bg-cover"
                          priority
                        />
                      ) : (
                        <ImageIcon size={32} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    form.reset();
                    onDelete();
                  }}
                  variant={"destructive"}
                >
                  Reset
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default DashboardCategoryCreate;
