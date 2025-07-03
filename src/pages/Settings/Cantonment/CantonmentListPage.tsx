import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import GlobalDrawer from "@/components/Custom/GlobalDrawer";
import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import { DataTable } from "@/components/Custom/DataTable";
import TableAction from "@/components/Custom/TableAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchData from "@/hooks/useFetchData";
import { deleteCantonment, getAllCantonment } from "@/api/cantonment.api";
import type { CANTONMENT } from "@/types/cantonment.type";
import CantonmentCreationForm from "./CantonmentCreationForm";
import GlobalAlertModal from "@/components/Custom/GlobalAlertModal";

const CantonmentListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  // const setSelectedData = useGlobalStore((state) => state.setSelectedData);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["cantonment"], () =>
    getAllCantonment()
  );

  const cantonment: CANTONMENT[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteCantonment,
    onSuccess: () => {
      toast.success("Cantonment Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: CANTONMENT) => [
    {
      label: (
        <button
          onClick={() => {
            // setSelectedData(data);
            setSelectedId(data?.id as number);
            openDrawer("update-cantonment");
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
            openAlertModal({
              action: "delete",
              title: "Confirm to delete Cantonment",
              description:
                "Are you sure you want to delete this Cantonment? This action cannot be undone.",
              confirmText: "Delete",
              variant: "destructive",
            });
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
        <Button onClick={() => openDrawer("create-cantonment")}>
          Create Cantonment
        </Button>
        {/* {searchComponent} */}
      </div>

      <DataTable
        isLoading={isLoading}
        data={cantonment}
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
      {/* {paginationComponent} */}
      {/* <Pagination /> */}

      <GlobalDrawer name="create-cantonment">
        <CantonmentCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-cantonment">
        <CantonmentCreationForm operation="update" />
      </GlobalDrawer>
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default CantonmentListPage;
