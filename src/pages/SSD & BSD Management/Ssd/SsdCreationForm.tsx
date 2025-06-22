import { getAllCantonment } from "@/api/management.api";
import { createSsd, updateSsd } from "@/api/ssd.api";
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
import { ssdSchema } from "@/schema/ssd.schema";
import { useGlobalStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SsdCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedData = useGlobalStore((state) => state.selectedData);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(ssdSchema),
    defaultValues: {
      name: "",
      district: "",
      upozilla: "",
      cantonmentId: "",
    },
  });

  useEffect(() => {
    if (operation === "update") {
      form.setValue("name", selectedData.name);
      form.setValue("district", selectedData.district);
      form.setValue("upozilla", selectedData.upozilla);
      form.setValue("cantonmentId", selectedData.cantonmentId?.toString());
    }
  }, [operation]);

  const createMutation = useMutation({
    mutationFn: createSsd,
    onSuccess: () => {
      toast.success("SSD Create Successful");
      query.invalidateQueries({ queryKey: ["ssd"] });
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
    mutationFn: updateSsd,
    onSuccess: () => {
      toast.success("SSD Update Successful");
      query.invalidateQueries({ queryKey: ["ssd"] });
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
    // console.log(data);
    if (operation === "update") {
      updateMutation.mutate({ id: selectedData.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const { data } = useFetchData(["cantonment"], () => getAllCantonment());
  const cantonments = data?.data ?? [];

  return (
    <React.Fragment>
      <DrawerHeader className="gap-1">
        <DrawerTitle>
          {operation === "update" ? "Update SSD" : "Create SSD"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} SSD.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormInput form={form} label="Name" name="name" />
          <FormInput
            form={form}
            label="District"
            name="district"
            placeholder="Enter district name"
          />
          <FormInput form={form} label="Upozilla" name="upozilla" />
          <FormSelect
            form={form}
            label="Cantonment"
            name="cantonmentId"
            placeholder="Select cantonment"
            options={cantonments}
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

export default SsdCreationForm;
