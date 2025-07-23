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
import type { MARKET } from "@/types/market.type";
import { deleteTenderPrice, getAllTenderPrices } from "@/api/tender-price.api";
import type { TENDER_PRICE } from "@/types/tender-price.type";
import TenederPriceCreationForm from "./TenderPriceCreationForm";

const TenderPriceListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["tender-price"], () =>
    getAllTenderPrices()
  );

  const market: TENDER_PRICE[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteTenderPrice,
    onSuccess: () => {
      toast.success("Tender Price Delete Successful");
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
            openDrawer("update-tender-price");
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
              title: "Confirm to delete tender price",
              description:
                "Are you sure you want to delete this tender price? This action cannot be undone.",
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
        <Button onClick={() => openDrawer("create-tender-price")}>
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
            accessorKey: "unitPrice",
            header: "Unit Price",
          },
          {
            accessorKey: "createdDate",
            header: "Created Date",
            cell: ({ original }) => {
              const dateValue = original.createdDate;
              if (!dateValue) return "-";

              const date = new Date(dateValue);
              return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
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

      <GlobalDrawer name="create-tender-price">
        <TenederPriceCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-tender-price">
        <TenederPriceCreationForm operation="update" />
      </GlobalDrawer>
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default TenderPriceListPage;
