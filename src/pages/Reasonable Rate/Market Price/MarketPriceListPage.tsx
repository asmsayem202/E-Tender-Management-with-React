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
import { deleteMarketPrice, getAllMarketPrice } from "@/api/market-price.api";
import type { MARKET_PRICE } from "@/types/market-price.type";
import MarketPriceCreationForm from "./MarketPriceCreationForm";

const MarketListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["market-price"], () =>
    getAllMarketPrice()
  );

  const marketPrice: MARKET_PRICE[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteMarketPrice,
    onSuccess: () => {
      toast.success("Market Price Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: MARKET_PRICE) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-market-price");
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
              title: "Confirm to delete Market Rate",
              description:
                "Are you sure you want to delete this Market Rate? This action cannot be undone.",
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
        <Button onClick={() => openDrawer("create-market-price")}>
          Create Market Rate
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={marketPrice}
        columns={[
          {
            accessorKey: "marketName",
            header: "Market Name",
          },
          {
            accessorKey: "itemName",
            header: "Item Name",
          },
          {
            accessorKey: "marketPrice",
            header: "Market Rate",
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

      <GlobalDrawer name="create-market-price">
        <MarketPriceCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-market-price">
        <MarketPriceCreationForm operation="update" />
      </GlobalDrawer>
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default MarketListPage;
