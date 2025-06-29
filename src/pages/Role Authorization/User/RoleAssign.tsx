import { getAllRole } from "@/api/role.api";
import { assignRole, getUser } from "@/api/user.api";
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
import { roleSchema } from "@/schema/role.schema";
import { useGlobalStore } from "@/store/store";
import type { ROLE } from "@/types/role.type";
import type { USER } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RoleAssign = () => {
  const query = useQueryClient();
  const selectedId = useGlobalStore((state) => state.selectedId);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  const form = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleIds: [],
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

  const { data: roleData } = useFetchData(["role"], () => getAllRole());
  const roles: ROLE[] = roleData?.data ?? [];

  useEffect(() => {
    form.setValue("roleIds", roles?.map((value: any) => value?.id) ?? []);
  }, [roles]);

  const assignMutation = useMutation({
    mutationFn: assignRole,
    onSuccess: () => {
      toast.success("Role Assign Successful");
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
    const payload = {
      userId: selectedId,
      roleIds: data?.roleIds,
    };
    assignMutation?.mutate({ data: payload });
  };
  console.log("watch ====>", form.watch());
  //   console.log("error ====>", form.formState.errors);

  if (isLoading) return <Loading />;

  return (
    <React.Fragment>
      <DrawerHeader className="gap-1">
        <DrawerTitle>Role Assign</DrawerTitle>
        <DrawerDescription>
          Fill up the details below to Assign Role
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto h-full px-4 text-sm">
        <Separator />
        {/*  body start */}
        <table className="w-full border border-gray-300 mt-2">
          <tbody>
            <tr className="border">
              <td className="p-2 font-semibold border">Full Name</td>
              <td className="p-2">{user?.fullName}</td>
            </tr>
            <tr className="border">
              <td className="p-2 font-semibold border">Email</td>
              <td className="p-2">{user?.email}</td>
            </tr>
            <tr className="border">
              <td className="p-2 font-semibold border">Phone Number</td>
              <td className="p-2">{user?.phoneNumber}</td>
            </tr>
          </tbody>
        </table>

        <Form {...form}>
          <MultiSelectDropdown
            label="Role"
            options={roles}
            placeholder="-- Select Role --"
            error={form?.formState.errors.roleIds?.message}
            defaultValue={user?.roles}
            onValuesChange={(array: any) => form?.setValue("roleIds", array)}
          />
        </Form>

        {/* body end */}
      </div>
      <DrawerFooter>
        <Button
          isLoading={assignMutation.isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          Assign
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </React.Fragment>
  );
};

export default RoleAssign;
