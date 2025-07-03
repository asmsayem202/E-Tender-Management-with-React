import {
  createSupplier,
  getSupplier,
  updateSupplier,
} from "@/api/supplier.api";
import FormCheckbox from "@/components/Custom/FormCheckbox";
import FormDatePicker from "@/components/Custom/FormDatePicker";
import FormFileUpload from "@/components/Custom/FormFileUpload";
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
import { generateImgUrl } from "@/lib/utils";
import { supplierSchema } from "@/schema/supplier.schema";
import { useGlobalStore } from "@/store/store";
import type { SUPPLIER } from "@/types/supplier.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SupplierCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      mobileNo: "",
      email: "",
      ascLicenseNo: "",
      ascLicenseEndorsementDate: "",
      ascLicenseExpiryDate: "",
      bankAccountName: "",
      bankAccountNo: "",
      bankBranchName: "",
      tin: "",
      bin: "",
      tinPicturePath: "",
      binPicturePath: "",
      assetValue: undefined,
      contractCapacity: undefined,
      otherBusiness: undefined,
      securityClearanceValidity: "",
      supplierPhotosPath: "",
      signaturePicturePath: "",
      otherBusinessLicensesCopyPath: "",
    },
  });

  const { data, isLoading } = useFetchData(["supplier", selectedId], () =>
    getSupplier(selectedId)
  );
  const supplier: SUPPLIER | null = data?.data ?? null;

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        name: supplier?.name || "",
        contactPerson: supplier?.contactPerson || "",
        mobileNo: supplier?.mobileNo || "",
        email: supplier?.email || "",
        ascLicenseNo: supplier?.ascLicenseNo || "",
        ascLicenseEndorsementDate: supplier?.ascLicenseEndorsementDate || "",
        ascLicenseExpiryDate: supplier?.ascLicenseExpiryDate || "",
        bankAccountName: supplier?.bankAccountName || "",
        bankAccountNo: supplier?.bankAccountNo || "",
        bankBranchName: supplier?.bankBranchName || "",
        tin: supplier?.tin || "",
        bin: supplier?.bin || "",
        tinPicturePath: generateImgUrl(supplier?.tinPicturePath) || "",
        binPicturePath: generateImgUrl(supplier?.binPicturePath) || "",
        assetValue:
          supplier?.assetValue !== undefined && supplier?.assetValue !== null
            ? String(supplier.assetValue)
            : undefined,
        contractCapacity:
          supplier?.contractCapacity !== undefined &&
          supplier?.contractCapacity !== null
            ? String(supplier.contractCapacity)
            : undefined,
        otherBusiness: Boolean(supplier?.otherBusiness),
        securityClearanceValidity: supplier?.securityClearanceValidity || "",
        supplierPhotosPath: generateImgUrl(supplier?.supplierPhotosPath) || "",
        signaturePicturePath:
          generateImgUrl(supplier?.signaturePicturePath) || "",
        otherBusinessLicensesCopyPath:
          generateImgUrl(supplier?.otherBusinessLicensesCopyPath) || "",
      });
    }
  }, [operation, selectedId, supplier, form]);

  const createMutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      toast.success("Supplier Create Successful");
      query.invalidateQueries({ queryKey: ["supplier"] });
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
    mutationFn: updateSupplier,
    onSuccess: () => {
      toast.success("Supplier Update Successful");
      query.invalidateQueries({ queryKey: ["supplier"] });
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

  // console.log("Form validation", form.formState.errors);
  // console.log("Form watch", form.watch());

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
          {operation === "update" ? "Update Supplier" : "Create Supplier"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} Supplier.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormInput form={form} label="Company Name" name="name" />
          <FormInput form={form} label="Person Name" name="contactPerson" />
          <FormInput form={form} label="Mobile Number" name="mobileNo" />
          <FormInput form={form} label="Email" name="email" />
          <FormInput form={form} label="ACS License No" name="ascLicenseNo" />
          <FormDatePicker
            form={form}
            label="Endorsement Date"
            name="ascLicenseEndorsementDate"
          />
          <FormDatePicker
            form={form}
            label="Expiry Date"
            name="ascLicenseExpiryDate"
          />
          <FormInput
            form={form}
            label="Supplier Bank Account Name"
            name="bankAccountName"
          />
          <FormInput form={form} label="Bank Account No" name="bankAccountNo" />
          <FormInput form={form} label="Branch Name" name="bankBranchName" />
          <FormInput form={form} label="BIN" name="bin" />
          <FormInput form={form} label="TIN" name="tin" />
          <FormFileUpload
            form={form}
            label="Bin Picture Path"
            name="binPicturePath"
          />
          <FormFileUpload
            form={form}
            label="Tin Picture Path"
            name="tinPicturePath"
          />
          <FormInput form={form} label="Asset Value" name="assetValue" />
          <FormInput
            form={form}
            label="Contract Capacity"
            name="contractCapacity"
          />
          <FormDatePicker
            form={form}
            label="Security Clearance Validity"
            name="securityClearanceValidity"
          />
          <FormFileUpload
            form={form}
            label="Supplier Photos Path"
            name="supplierPhotosPath"
          />
          <FormFileUpload
            form={form}
            label="Signature Picture Path"
            name="signaturePicturePath"
          />

          <FormCheckbox
            size="size-5"
            label="Have Other Businesses"
            checked={!!form.getValues("otherBusiness")}
            id="otherBusiness"
            onClick={() => {
              const currentValue = form.getValues("otherBusiness");
              const newValue = !currentValue;

              form.setValue("otherBusiness", newValue);

              // If unchecked, clear the related file path
              if (!newValue) {
                form.setValue("otherBusinessLicensesCopyPath", null, {
                  shouldValidate: true,
                });
              }
            }}
          />

          {form.watch("otherBusiness") && (
            <FormFileUpload
              form={form}
              label="Other Business Licenses Copy Path"
              name="otherBusinessLicensesCopyPath"
            />
          )}
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

export default SupplierCreationForm;
