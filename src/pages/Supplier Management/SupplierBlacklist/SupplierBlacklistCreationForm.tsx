import {
  createSupplierBlacklist,
  getSupplierBlacklist,
} from "@/api/supplier-blacklist.api";
import { getAllSupplier } from "@/api/supplier.api";
import FormSearchSelect from "@/components/Custom/FormSearchSelect";
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
import { supplierBlacklistSchema } from "@/schema/supplier-blacklist.schema";
import { useGlobalStore } from "@/store/store";
import type { SUPPLIER_BLACKLIST } from "@/types/supplier-blacklist.type";
import type { SUPPLIER } from "@/types/supplier.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SupplierBlacklistCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const user: any = useGlobalStore((state) => state.user);

  const form = useForm({
    resolver: zodResolver(supplierBlacklistSchema),
    defaultValues: {
      supplierId: "",
      requestedBy: user.sub,
      blacklistRemarks: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["supplier-blacklist", selectedId],
    () => getSupplierBlacklist(selectedId),
    {
      queryKey: ["supplier-blacklist", selectedId],
      enabled: selectedId !== null,
    }
  );
  const supplierBlacklist: SUPPLIER_BLACKLIST | null = data?.data ?? null;

  const { data: allSupplier } = useFetchData(["supplier"], () =>
    getAllSupplier("")
  );
  const allSuppliers: SUPPLIER[] = allSupplier?.data ?? [];

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        supplierId: supplierBlacklist?.supplierId.toString() || "",
        requestedBy: user.sub,
        blacklistRemarks: supplierBlacklist?.blacklistRemarks || "",
      });
    }
  }, [operation, selectedId, supplierBlacklist, form]);

  const createMutation = useMutation({
    mutationFn: createSupplierBlacklist,
    onSuccess: () => {
      toast.success("Supplier Blacklist Create Successful");
      query.invalidateQueries({ queryKey: ["supplier-blacklist"] });
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
    createMutation.mutate(data);
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
            ? "Update Supplier Blacklist"
            : "Create Supplier Blacklist"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Supplier Blacklist.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormSearchSelect
            form={form}
            label="Select Supplier"
            name="supplierId"
            placeholder="Select a supplier"
            options={allSuppliers}
          />

          <FormTextArea form={form} label="Remarks" name="blacklistRemarks" />
        </Form>

        {/* body end */}
      </div>
      <DrawerFooter>
        <Button
          isLoading={createMutation.isPending}
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

export default SupplierBlacklistCreationForm;
