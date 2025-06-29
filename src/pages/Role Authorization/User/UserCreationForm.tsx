import { getAllBsd } from "@/api/bsd.api";
import { getAllDepartment } from "@/api/department.api";
import { getAllRole } from "@/api/role.api";
import { getAllSsd } from "@/api/ssd.api";
import { createUser, getUser, updateUser } from "@/api/user.api";
import FormInput from "@/components/Custom/FormInput";
import FormPassword from "@/components/Custom/FormPassword";
import FormSelect from "@/components/Custom/FormSelect";
import Loading from "@/components/Custom/Loading";
import MultiSelectDropdown from "@/components/Custom/MultiSelectDropdown";
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
import { userSchema } from "@/schema/user.schema";
import { useGlobalStore } from "@/store/store";
import type { BSD } from "@/types/bsd.type";
import type { DEPARTMENT } from "@/types/department.type";
import type { ROLE } from "@/types/role.type";
import type { SSD } from "@/types/ssd.type";
import type { USER } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UserCreationForm = ({ operation }: any) => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      departmentId: "",
      password: "",
      bsdId: "",
      ssdId: "",
      roleIds: [],
      ssdOrBsd: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["user", selectedId],
    () => getUser(selectedId),
    {
      queryKey: ["user", selectedId],
      enabled: selectedId !== null,
    }
  );

  const user: USER | null = data?.data ?? null;

  const { data: departmentData } = useFetchData(["department"], () =>
    getAllDepartment()
  );
  const departments: DEPARTMENT[] = departmentData?.data ?? [];

  const { data: roleData } = useFetchData(["role"], () => getAllRole());
  const roles: ROLE[] = roleData?.data ?? [];

  const { data: bsdData } = useFetchData(["bsd"], () => getAllBsd());
  const bsd: BSD[] = bsdData?.data ?? [];

  const { data: ssdData } = useFetchData(["ssd"], () => getAllSsd());
  const ssds: SSD[] = ssdData?.data ?? [];

  useEffect(() => {
    if (operation === "update") {
      const resetData: any = {
        fullName: user?.fullName ?? "",
        userName: user?.userName ?? "",
        email: user?.email ?? "",
        phoneNumber: user?.phoneNumber ?? "",
        departmentId: user?.departmentId?.toString() ?? "",
      };
      form.reset(resetData);
      if (user?.bsdId) {
        form.setValue("ssdOrBsd", "bsd");
        form.setValue("bsdId", user?.bsdId?.toString() ?? "");
      } else if (user?.ssdId) {
        form.setValue("ssdOrBsd", "bsd");
        form.setValue("ssdId", user?.ssdId?.toString() ?? "");
      }
    }
  }, [operation, user]);

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User Create Successful");
      query.invalidateQueries({ queryKey: ["user"] });
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
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User Update Successful");
      query.invalidateQueries({ queryKey: ["user"] });
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
    const { ssdOrBsd, ...rest } = data;
    if (operation === "update") {
      updateMutation.mutate({ id: selectedId, data: rest });
    } else {
      createMutation.mutate(rest);
    }
  };

  // console.log(form.watch());
  console.log("error ====>", form.formState.errors);

  const handleTypeChange = (data: string) => {
    if (data === "ssd") {
      form.setValue("bsdId", "");
    } else if (data === "bsd") {
      form.setValue("ssdId", "");
    }
  };

  if (operation === "update") {
    if (isLoading) return <Loading />;
  }

  return (
    <React.Fragment>
      <DrawerHeader className="gap-1">
        <DrawerTitle>
          {operation === "update" ? "Update User" : "Create User"}
        </DrawerTitle>
        <DrawerDescription>
          Fill up the details below to{" "}
          {operation === "update" ? "update" : "create"} User.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto h-full px-4 text-sm">
        <Separator />
        {/*  body start */}

        <Form {...form}>
          <FormInput form={form} label="Full Name" name="fullName" />
          <FormInput form={form} label="User Name" name="userName" />
          <FormInput form={form} label="Email" name="email" type="email" />
          <FormInput
            form={form}
            label="Phone Number"
            name="phoneNumber"
            type="number"
          />

          {operation === "create" && (
            <FormPassword
              form={form}
              label="Password"
              name="password"
              placeholder="Password"
            />
          )}

          {/* <FormSearchSelect
            form={form}
            label="Search Department"
            name="departmentId"
            placeholder="Select department"
            options={departments}
          /> */}

          <FormSelect
            form={form}
            label="Department"
            name="departmentId"
            placeholder="Select department"
            options={departments}
          />
          <FormSelect
            form={form}
            label="SSD/BSD"
            name="ssdOrBsd"
            placeholder="Select ssd or bsd"
            options={[
              { id: "ssd", name: "SSD" },
              { id: "bsd", name: "BSD" },
            ]}
            handleChange={handleTypeChange}
          />
          {form.getValues("ssdOrBsd") === "bsd" && (
            <FormSelect
              form={form}
              label="BSD"
              name="bsdId"
              placeholder="Select bsd"
              options={bsd}
            />
          )}

          {form.getValues("ssdOrBsd") === "ssd" && (
            <FormSelect
              form={form}
              label="SSD"
              name="ssdId"
              placeholder="Select ssd"
              options={ssds}
            />
          )}

          {operation === "create" && (
            <MultiSelectDropdown
              label="Role"
              options={roles}
              placeholder="-- Select Role --"
              error={form?.formState.errors.roleIds?.message}
              onValuesChange={(array: any) => form?.setValue("roleIds", array)}
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

export default UserCreationForm;
