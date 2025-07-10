import { getAllCategory } from "@/api/category.api";
import { createItem, getItem, updateItem } from "@/api/item.api";
import { getAllUnit } from "@/api/unit.api";
import FormInput from "@/components/Custom/FormInput";
import FormSelect from "@/components/Custom/FormSelect";
import FormTextArea from "@/components/Custom/FormTextArea";
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
import { itemSchema } from "@/schema/item.schema";
import { useGlobalStore } from "@/store/store";
import type { CATEGORY } from "@/types/category.type";
import type { ITEM } from "@/types/item.type";
import type { UNIT } from "@/types/unit.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ItemCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      unitId: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["item", selectedId],
    () => getItem(selectedId),
    {
      queryKey: ["item", selectedId],
      enabled: selectedId !== null,
    }
  );
  const item: ITEM | null = data?.data ?? null;

  const { data: allCategories } = useFetchData(["category"], () =>
    getAllCategory()
  );
  const categories: CATEGORY[] = allCategories?.data ?? [];

  const { data: allUnits } = useFetchData(["unit"], () => getAllUnit());
  const units: UNIT[] = allUnits?.data ?? [];

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        name: item?.name || "",
        description: item?.description || "",
        categoryId: item?.categoryId?.toString() || "",
        unitId: item?.unitId?.toString() || "",
      });
    }
  }, [operation, selectedId, item, form]);

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      toast.success("Item Create Successful");
      query.invalidateQueries({ queryKey: ["item"] });
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
    mutationFn: updateItem,
    onSuccess: () => {
      toast.success("Item Update Successful");
      query.invalidateQueries({ queryKey: ["item"] });
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
          {operation === "update" ? "Update Unit" : "Create Unit"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Unit.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}
        <Form {...form}>
          <FormSelect
            form={form}
            label="Category"
            name="categoryId"
            placeholder="Select a category"
            options={categories}
          />
          <FormSelect
            form={form}
            label="Unit"
            name="unitId"
            placeholder="Select a unit"
            options={units}
          />
          <FormInput form={form} label="Name" name="name" />
          <FormTextArea form={form} label="Description" name="description" />
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

export default ItemCreationForm;
