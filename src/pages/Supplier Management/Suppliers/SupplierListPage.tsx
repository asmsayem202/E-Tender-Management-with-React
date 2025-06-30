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
import { deleteSupplier, getAllSupplier } from "@/api/supplier.api";
import type { SUPPLIER } from "@/types/supplier.type";

const SupplierListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["supplier"], () =>
    getAllSupplier("")
  );

  const suppliers: SUPPLIER[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      toast.success("Supplier Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: SUPPLIER) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-supplier");
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
        <Button onClick={() => openDrawer("create-supplier")}>
          Create Supplier
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={suppliers}
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "contactPerson",
            header: "User Name",
          },
          {
            accessorKey: "ascLicenseNo",
            header: "asc License No",
          },
          {
            accessorKey: "mobileNo",
            header: "Number",
          },
          {
            accessorKey: "email",
            header: "Email",
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

      <GlobalDrawer name="create-supplier">
        {/* <WarningCreationForm operation="create" /> */}
      </GlobalDrawer>
      <GlobalDrawer name="update-supplier">
        {/* <WarningCreationForm operation="update" /> */}
      </GlobalDrawer>

      <GlobalAlertModal mutation={deleteMutation} />
    </div>
  );
};

export default SupplierListPage;
