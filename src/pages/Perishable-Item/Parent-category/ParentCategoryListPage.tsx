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
import {
  deleteParentCategory,
  getAllParentCategory,
} from "@/api/parent-category.api";
import type { PARENT_CATEGORY } from "@/types/parent-category.type";
import ParentCategoryCreationForm from "./ParentCategoryCreationForm";

const ParentCategoryListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["parent-category"], () =>
    getAllParentCategory()
  );

  const parentCategory: PARENT_CATEGORY[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteParentCategory,
    onSuccess: () => {
      toast.success("Parent Category Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: PARENT_CATEGORY) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-parent-category");
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
        <Button onClick={() => openDrawer("create-parent-category")}>
          Create Parent Category
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={parentCategory}
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

      <GlobalDrawer name="create-parent-category">
        <ParentCategoryCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-parent-category">
        <ParentCategoryCreationForm operation="update" />
      </GlobalDrawer>

      <GlobalAlertModal mutation={deleteMutation} />
    </div>
  );
};

export default ParentCategoryListPage;
