import { getSupplierWarning } from "@/api/supplier-warning.api";
import { getAllSupplier } from "@/api/supplier.api";
import {
  createWarning,
  getAllWarning,
  getWarning,
  updateWarning,
} from "@/api/warning.api";
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
import { supplierWarningSchema } from "@/schema/supplier-warning.schema";
import { useGlobalStore } from "@/store/store";
import type { SUPPLIER_WARNING } from "@/types/supplier-warning.type";
import type { SUPPLIER } from "@/types/supplier.type";
import type { WARNING } from "@/types/warning.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SupplierWarningCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(supplierWarningSchema),
    defaultValues: {
      supplierId: "",
      warningId: "",
      remarks: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["supplier-warning", selectedId],
    () => getSupplierWarning(selectedId)
  );
  const supplierWarning: SUPPLIER_WARNING | null = data?.data ?? null;

  const { data: allSupplier } = useFetchData(["supplier"], () =>
    getAllSupplier("")
  );
  const allSuppliers: SUPPLIER[] = allSupplier?.data ?? [];

  const { data: allWarning } = useFetchData(["warning"], () => getAllWarning());
  const allWarnings: WARNING[] = allWarning?.data ?? [];

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        supplierId: supplierWarning?.supplierId.toString() || "",
        warningId: supplierWarning?.warningId.toString() || "",
        remarks: supplierWarning?.remarks || "",
      });
    }
  }, [operation, selectedId, supplierWarning, form]);

  const createMutation = useMutation({
    mutationFn: createWarning,
    onSuccess: () => {
      toast.success("Supplier Warning Create Successful");
      query.invalidateQueries({ queryKey: ["warning"] });
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
    mutationFn: updateWarning,
    onSuccess: () => {
      toast.success("Supplier Warning Update Successful");
      query.invalidateQueries({ queryKey: ["warning"] });
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
            ? "Update Supplier Warning"
            : "Create Supplier Warning"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Supplier Warning.
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

          <FormSearchSelect
            form={form}
            label="Select Warning Type"
            name="warningId"
            placeholder="Select a warning type"
            options={allWarnings}
          />

          <FormTextArea form={form} label="Remarks" name="remarks" />
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

export default SupplierWarningCreationForm;
