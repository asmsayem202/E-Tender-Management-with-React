import { getAllCategory } from "@/api/category.api";
import { createFactor, getFactor, updateFactor } from "@/api/factor.api";
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
import { factorSchema } from "@/schema/factor.schema";
import { useGlobalStore } from "@/store/store";
import type { FACTOR } from "@/types/factor.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const FactorCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(factorSchema),
    defaultValues: {
      name: "",
      percentageRate: "",
      description: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["factor", selectedId],
    () => getFactor(selectedId),
    {
      queryKey: ["factor", selectedId],
      enabled: selectedId !== null,
    }
  );
  const factor: FACTOR | null = data?.data ?? null;

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        name: factor?.name || "",
        percentageRate: factor?.percentageRate.toString() || "",
        description: factor?.description || "",
      });
    }
  }, [operation, selectedId, factor, form]);

  const createMutation = useMutation({
    mutationFn: createFactor,
    onSuccess: () => {
      toast.success("Factor Create Successful");
      query.invalidateQueries({ queryKey: ["factor"] });
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
    mutationFn: updateFactor,
    onSuccess: () => {
      toast.success("Factor Update Successful");
      query.invalidateQueries({ queryKey: ["factor"] });
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
          {operation === "update" ? "Update Factor" : "Create Factor"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Factor.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}
        <Form {...form}>
          <FormInput form={form} label="Name" name="name" />
          <FormInput
            form={form}
            label="Percentage Rate"
            name="percentageRate"
          />
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

export default FactorCreationForm;
