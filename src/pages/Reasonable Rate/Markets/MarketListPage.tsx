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
import { deleteMarket, getAllMarket } from "@/api/market.api";
import type { MARKET } from "@/types/market.type";
import MarketCreationForm from "./MarketCreationForm";

const MarketListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["market"], () =>
    getAllMarket()
  );

  const market: MARKET[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteMarket,
    onSuccess: () => {
      toast.success("Market Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: MARKET) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-market");
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
              title: "Confirm to delete Market",
              description:
                "Are you sure you want to delete this Market? This action cannot be undone.",
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
        <Button onClick={() => openDrawer("create-market")}>
          Create Market
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={market}
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

      <GlobalDrawer name="create-market">
        <MarketCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-market">
        <MarketCreationForm operation="update" />
      </GlobalDrawer>
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default MarketListPage;
