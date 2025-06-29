import {
  createCategory,
  getCategory,
  updateCategory,
} from "@/api/category.api";
import { getAllParentCategory } from "@/api/parent-category.api";
import FormInput from "@/components/Custom/FormInput";
import FormSelect from "@/components/Custom/FormSelect";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import useFetchData from "@/hooks/useFetchData";
import { categorySchema } from "@/schema/category.schema";
import { useGlobalStore } from "@/store/store";
import type { CATEGORY } from "@/types/category.type";
import type { PARENT_CATEGORY } from "@/types/parent-category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CategoryCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      parentCategoryId: "",
    },
  });

  const { data, isLoading } = useFetchData(["category", selectedId], () =>
    getCategory(selectedId)
  );
  const category: CATEGORY | null = data?.data ?? null;

  const { data: allParentCategories } = useFetchData(["parent-category"], () =>
    getAllParentCategory()
  );
  const parentCategories: PARENT_CATEGORY[] = allParentCategories?.data ?? [];

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        name: category?.name || "",
        parentCategoryId: category?.parentCategoryId?.toString() || "",
      });
    }
  }, [operation, selectedId, category, form]);

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category Create Successful");
      query.invalidateQueries({ queryKey: ["category"] });
      closeDrawer();
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string; errors: any } };
      };
      const errorObject: any = err.response?.data?.errors;
      for (const property in errorObject) {
        const errorMessage = Object.values(errorObject[property]).join("");
        form.setError(property as any, { message: errorMessage });
      }
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category Update Successful");
      query.invalidateQueries({ queryKey: ["category"] });
      closeDrawer();
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string; errors: any } };
      };
      const errorObject: any = err.response?.data?.errors;
      for (const property in errorObject) {
        const errorMessage = Object.values(errorObject[property]).join("");
        form.setError(property as any, { message: errorMessage });
      }
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit = (data: any) => {
    if (operation === "update") {
      updateMutation.mutate({ id: selectedId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (operation === "update") {
    if (isLoading)
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      );
  }

  return (
    <React.Fragment>
      <DrawerHeader className="gap-1">
        <DrawerTitle>
          {operation === "update" ? "Update Category" : "Create Category"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Category.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormInput form={form} label="Name" name="name" />
          <FormSelect
            form={form}
            label="Parent Category"
            name="parentCategoryId"
            placeholder="Select a parent category"
            options={parentCategories}
          />
        </Form>

        {/* body end */}
      </div>
      <DrawerFooter>
        <Button
          isLoading={createMutation.isPending || updateMutation.isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          {operation === "update" ? "Update" : "Create"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </React.Fragment>
  );
};

export default CategoryCreationForm;
