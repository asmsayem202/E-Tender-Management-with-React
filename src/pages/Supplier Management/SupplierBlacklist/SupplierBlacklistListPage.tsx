import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import { DataTable } from "@/components/Custom/DataTable";
import useFetchData from "@/hooks/useFetchData";
import {
  approveSupplierBlacklist,
  declineSupplierBlacklist,
  getAllSupplierBlacklist,
} from "@/api/supplier-blacklist.api";
import type { SUPPLIER_BLACKLIST } from "@/types/supplier-blacklist.type";
import GlobalDrawer from "@/components/Custom/GlobalDrawer";
import SupplierBlacklistCreationForm from "./SupplierBlacklistCreationForm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Ban, EllipsisIcon, Send, TrashIcon } from "lucide-react";
import TableAction from "@/components/Custom/TableAction";
import GlobalAlertModal from "@/components/Custom/GlobalAlertModal";

const SupplierBlacklistListPage = () => {
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const user: any = useGlobalStore((state) => state.user);
  const { data, isLoading, refetch } = useFetchData(
    ["supplier-blacklist"],
    () => getAllSupplierBlacklist()
  );

  const blacklists: SUPPLIER_BLACKLIST[] = data?.data ?? [];

  const approveMutation = useMutation({
    mutationFn: approveSupplierBlacklist,
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
    mutationFn: declineSupplierBlacklist,
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

  const actionItems = (data: SUPPLIER_BLACKLIST) => {
    const items = [
      {
        label: (
          <button
            // onClick={() => {
            //   setSelectedId(data?.id as number);
            //   openAlertModal({
            //     action: "delete",
            //     title: "Confirm to delete Supplier Blacklist",
            //     description:
            //       "Are you sure you want to delete this Supplier Blacklist? This action cannot be undone.",
            //     confirmText: "Delete",
            //     variant: "destructive",
            //   });
            // }}
            className="flex items-center gap-3 w-full"
          >
            <TrashIcon size={20} />
            <span>Delete</span>
          </button>
        ),
      },
    ];

    if (data?.status === "Pending") {
      items.push(
        {
          label: (
            <button
              onClick={() => {
                setSelectedId(data?.id as number);
                openAlertModal({
                  action: "approve",
                  title: "Confirm to Approve Supplier Blacklist",
                  description:
                    "Are you sure you want to Approve this Supplier Blacklist?",
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
                  title: "Confirm to Decline Supplier Blacklist",
                  description:
                    "Are you sure you want to Decline this Supplier Blacklist?",
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
        <Button onClick={() => openDrawer("create-supplier-blacklist")}>
          Create Supplier Blacklist
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={blacklists}
        columns={[
          {
            accessorKey: "supplierName",
            header: "Supplier Name",
          },
          {
            accessorKey: "requesterName",
            header: "Requester Name",
          },
          {
            accessorKey: "blacklistRemarks",
            header: "Blacklist Remarks",
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ original }) => {
              const status = original.status;

              const getStatusClass = (status: string) => {
                switch (status) {
                  case "Pending":
                    return "bg-orange-100 text-orange-800 border border-orange-500";
                  case "Approved":
                    return "bg-green-100 text-green-800 border border-green-500";
                  case "Declined":
                    return "bg-red-100 text-red-800 border border-red-500";
                  default:
                    return "bg-gray-100 text-gray-800 border border-gray-500";
                }
              };

              return (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusClass(
                    status ?? ""
                  )}`}
                >
                  {status}
                </span>
              );
            },
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

      <GlobalDrawer name="create-supplier-blacklist">
        <SupplierBlacklistCreationForm operation="create" />
      </GlobalDrawer>

      <GlobalAlertModal
        mutations={{
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

export default SupplierBlacklistListPage;
