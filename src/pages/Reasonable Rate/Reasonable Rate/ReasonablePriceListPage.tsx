import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import GlobalDrawer from "@/components/Custom/GlobalDrawer";
import { EllipsisIcon, TrashIcon } from "lucide-react";
import { DataTable } from "@/components/Custom/DataTable";
import TableAction from "@/components/Custom/TableAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchData from "@/hooks/useFetchData";
import GlobalAlertModal from "@/components/Custom/GlobalAlertModal";
import {
  deleteReasonablePrice,
  getAllReasonablePrice,
} from "@/api/reasonable-rate.api";
import type { REASONABLE_PRICE } from "@/types/reasonable-price.type";
import ReasonablePriceCreationForm from "./ReasonablePriceCreationForm";

const ReasonablePriceListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["reasonable-price"], () =>
    getAllReasonablePrice()
  );

  const reasonablePrice: REASONABLE_PRICE[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteReasonablePrice,
    onSuccess: () => {
      toast.success("Reasonable Price Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: REASONABLE_PRICE) => [
    // {
    //   label: (
    //     <button
    //       onClick={() => {
    //         setSelectedId(data?.id as number);
    //         openDrawer("update-reasonable-price");
    //       }}
    //       className="flex items-center gap-3 w-full cursor-pointer"
    //     >
    //       <EditIcon size={20} />
    //       <span>Edit</span>
    //     </button>
    //   ),
    // },
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openAlertModal({
              action: "delete",
              title: "Confirm to delete Reasonable Rate",
              description:
                "Are you sure you want to delete this Reasonable Rate? This action cannot be undone.",
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
        <Button onClick={() => openDrawer("create-reasonable-price")}>
          Create Reasonable Rate
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={reasonablePrice}
        columns={[
          {
            accessorKey: "itemName",
            header: "Item Name",
          },
          {
            accessorKey: "unitName",
            header: "Unit Name",
          },
          {
            accessorKey: "averagePriceOfMarkets",
            header: "Avg Market Price",
          },
          {
            accessorKey: "boardApprovedMaxPrice",
            header: "Board Approved Max Price",
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

      <GlobalDrawer name="create-reasonable-price">
        <ReasonablePriceCreationForm operation="create" />
      </GlobalDrawer>
      {/* <GlobalDrawer name="update-reasonable-price">
        <ReasonablePriceCreationForm operation="update" />
      </GlobalDrawer> */}
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default ReasonablePriceListPage;
