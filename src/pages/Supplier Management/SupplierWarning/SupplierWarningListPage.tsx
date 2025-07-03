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
import SupplierWarningCreationForm from "./SupplierWarningCreationForm";
import type { SUPPLIER_WARNING } from "@/types/supplier-warning.type";
import {
  deleteSupplierWarning,
  getAllSupplierWarning,
} from "@/api/supplier-warning.api";

const SupplierWarningListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["supplier-warning"], () =>
    getAllSupplierWarning()
  );

  const warnings: SUPPLIER_WARNING[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteSupplierWarning,
    onSuccess: () => {
      toast.success("Supplier Warning Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: SUPPLIER_WARNING) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-supplier-warning");
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
              title: "Confirm to delete supplier warning",
              description:
                "Are you sure you want to delete this supplier warning? This action cannot be undone.",
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
        <Button onClick={() => openDrawer("create-supplier-warning")}>
          Create Supplier Warning
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={warnings}
        columns={[
          {
            accessorKey: "supplierName",
            header: "Supplier Name",
          },
          {
            accessorKey: "warningType",
            header: "Warning Type",
          },
          {
            accessorKey: "remarks",
            header: "Remarks",
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

      <GlobalDrawer name="create-supplier-warning">
        <SupplierWarningCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-supplier-warning">
        <SupplierWarningCreationForm operation="update" />
      </GlobalDrawer>
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default SupplierWarningListPage;
