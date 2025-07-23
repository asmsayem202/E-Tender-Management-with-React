import {
  createTenderPrice,
  getTenderPrice,
  updateTenderPrice,
} from "@/api/tender-price.api";
import FormInput from "@/components/Custom/FormInput";
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
import { tenderPriceSchema } from "@/schema/tender-price.schema";
import { useGlobalStore } from "@/store/store";
import type { TENDER_PRICE } from "@/types/tender-price.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TenederPriceCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(tenderPriceSchema),
    defaultValues: {
      name: "",
      unitPrice: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["tender-price", selectedId],
    () => getTenderPrice(selectedId),
    {
      queryKey: ["tender-price", selectedId],
      enabled: selectedId !== null,
    }
  );
  const tenderPrice: TENDER_PRICE | null = data?.data ?? null;

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        name: tenderPrice?.name || "",
        unitPrice: tenderPrice?.unitPrice || "",
      });
    }
  }, [operation, selectedId, tenderPrice, form]);

  const createMutation = useMutation({
    mutationFn: createTenderPrice,
    onSuccess: () => {
      toast.success("Tender Price Create Successful");
      query.invalidateQueries({ queryKey: ["tender-price"] });
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
    mutationFn: updateTenderPrice,
    onSuccess: () => {
      toast.success("Tender Price Update Successful");
      query.invalidateQueries({ queryKey: ["tender-price"] });
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
          {operation === "update"
            ? "Update Tender Price"
            : "Create Tender Price"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Tender Price.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormInput form={form} label="Name" name="name" />
          <FormInput type="number" form={form} label="Price" name="unitPrice" />
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

export default TenederPriceCreationForm;
