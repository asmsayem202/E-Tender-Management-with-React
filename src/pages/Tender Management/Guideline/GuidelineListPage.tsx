import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import { DataTable } from "@/components/Custom/DataTable";
import TableAction from "@/components/Custom/TableAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchData from "@/hooks/useFetchData";
import GlobalAlertModal from "@/components/Custom/GlobalAlertModal";
import {
  deleteTenderGuideline,
  getAllTenderGuidelines,
} from "@/api/tender-guideline.api";
import type { TENDER_GUIDELINE } from "@/types/tender-guideline.type";
import { Link } from "react-router-dom";

const GuidelineListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["tender-guideline"], () =>
    getAllTenderGuidelines()
  );

  const tenderGuidelines: TENDER_GUIDELINE[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteTenderGuideline,
    onSuccess: () => {
      toast.success("Tender Guideline Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: TENDER_GUIDELINE) => [
    {
      label: (
        <Link
          to={`dashboard/guideline-creation/${data?.id as number}`}
          className="flex items-center gap-3 w-full cursor-pointer"
        >
          <EditIcon size={20} />
          <span>Edit</span>
        </Link>
      ),
    },
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openAlertModal({
              action: "delete",
              title: "Confirm to delete Tender Guideline",
              description:
                "Are you sure you want to delete this Tender Guideline? This action cannot be undone.",
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
        <Button>
          <Link to={"dashboard/guideline-creation"}>Create Guideline</Link>
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={tenderGuidelines}
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "createdDate",
            header: "Date",
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

      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default GuidelineListPage;
