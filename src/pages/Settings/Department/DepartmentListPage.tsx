import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import GlobalDrawer from "@/components/Custom/GlobalDrawer";
import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import { DataTable } from "@/components/Custom/DataTable";
import TableAction from "@/components/Custom/TableAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchData from "@/hooks/useFetchData";
import GlobalAlertModal from "@/components/Custom/GlobalAlertModal";
import DepartmentCreationForm from "./DepartmentCreationForm";
import type { DEPARTMENT } from "@/types/department.type";
import { deleteDepartment, getAllDepartment } from "@/api/department.api";

const DepartmentListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["department"], () =>
    getAllDepartment()
  );

  const department: DEPARTMENT[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      toast.success("Department Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: DEPARTMENT) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-department");
          }}
          className="flex items-center gap-3 w-full cursor-pointer"
        >
          <EditIcon size={20} />
          <span>Edit</span>
        </button>
      ),
    },
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openAlertModal();
          }}
          className="flex items-center gap-3 w-full"
        >
          <TrashIcon size={20} />
          <span>Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-3 flex justify-between gap-2">
        <Button onClick={() => openDrawer("create-department")}>
          Create Department
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={department}
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            header: "Actions",
            cell: ({ original }) => (
              <TableAction
                list={actionItems(original)}
                trigger={<EllipsisIcon />}
              />
            ),
          },
        ]}
      />

      <GlobalDrawer name="create-department">
        <DepartmentCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-department">
        <DepartmentCreationForm operation="update" />
      </GlobalDrawer>

      <GlobalAlertModal mutation={deleteMutation} />
    </div>
  );
};

export default DepartmentListPage;
