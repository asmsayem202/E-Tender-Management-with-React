import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import GlobalDrawer from "@/components/Custom/GlobalDrawer";
import { Ban, EditIcon, EllipsisIcon, Send, TrashIcon } from "lucide-react";
import { DataTable } from "@/components/Custom/DataTable";
import TableAction from "@/components/Custom/TableAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchData from "@/hooks/useFetchData";
import GlobalAlertModal from "@/components/Custom/GlobalAlertModal";
import {
  approveSupplier,
  declineSupplier,
  deleteSupplier,
  getAllSupplier,
} from "@/api/supplier.api";
import type { SUPPLIER } from "@/types/supplier.type";
import SupplierCreationForm from "./SupplierCreationForm";

const SupplierListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const user: any = useGlobalStore((state) => state.user);
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

  const approveMutation = useMutation({
    mutationFn: approveSupplier,
    onSuccess: () => {
      toast.success("Supplier Approved Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const declineMutation = useMutation({
    mutationFn: declineSupplier,
    onSuccess: () => {
      toast.success("Supplier Declined Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: SUPPLIER) => {
    const items = [
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
              openAlertModal({
                action: "delete",
                title: "Confirm to delete Supplier",
                description:
                  "Are you sure you want to delete this Supplier? This action cannot be undone.",
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

    if (data?.approvalStatus === "Pending") {
      items.push(
        {
          label: (
            <button
              onClick={() => {
                setSelectedId(data?.id as number);
                openAlertModal({
                  action: "approve",
                  title: "Confirm to Approve Supplier",
                  description:
                    "Are you sure you want to Approve this Supplier?",
                  confirmText: "Approved",
                  variant: "default",
                });
              }}
              className="flex items-center gap-3 w-full"
            >
              <Send size={20} />
              <span>Approve</span>
            </button>
          ),
        },
        {
          label: (
            <button
              onClick={() => {
                setSelectedId(data?.id as number);
                openAlertModal({
                  action: "decline",
                  title: "Confirm to Decline Supplier",
                  description:
                    "Are you sure you want to Decline this Supplier?",
                  confirmText: "Declined",
                  variant: "destructive",
                });
              }}
              className="flex items-center gap-3 w-full"
            >
              <Ban size={20} />
              <span>Decline</span>
            </button>
          ),
        }
      );
    }

    return items;
  };

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
            header: "Company Name",
          },
          {
            accessorKey: "contactPerson",
            header: "Person Name",
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
            accessorKey: "approvalStatus",
            header: "Status",
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
        <SupplierCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-supplier">
        <SupplierCreationForm operation="update" />
      </GlobalDrawer>

      <GlobalAlertModal
        mutations={{
          delete: deleteMutation,
          approve: approveMutation,
          decline: declineMutation,
        }}
        data={{
          approve: { userId: user?.sub, isApproved: true, remarks: "Approved" },
          decline: {
            userId: user?.sub,
            isApproved: false,
            remarks: "Declined",
          },
        }}
      />
    </div>
  );
};

export default SupplierListPage;
