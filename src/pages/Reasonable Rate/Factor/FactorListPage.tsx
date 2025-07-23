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
import { deleteFactor, getAllFactor } from "@/api/factor.api";
import type { FACTOR } from "@/types/factor.type";
import FactorCreationForm from "./FactorCreationForm";

const FactorListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["factor"], () =>
    getAllFactor()
  );

  const factors: FACTOR[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteFactor,
    onSuccess: () => {
      toast.success("Factor Delete Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: FACTOR) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedId(data?.id as number);
            openDrawer("update-factor");
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
              title: "Confirm to delete Factor",
              description:
                "Are you sure you want to delete this Factor? This action cannot be undone.",
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
        <Button onClick={() => openDrawer("create-factor")}>
          Create Factor
        </Button>
      </div>

      <DataTable
        isLoading={isLoading}
        data={factors}
        columns={[
          {
            accessorKey: "name",
            header: "Factor Name",
          },
          {
            accessorKey: "percentageRate",
            header: "Percentage Rate",
          },
          {
            accessorKey: "description",
            header: "Description",
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

      <GlobalDrawer name="create-factor">
        <FactorCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-factor">
        <FactorCreationForm operation="update" />
      </GlobalDrawer>
      <GlobalAlertModal mutations={{ delete: deleteMutation }} />
    </div>
  );
};

export default FactorListPage;
