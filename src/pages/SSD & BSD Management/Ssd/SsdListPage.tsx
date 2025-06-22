import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import GlobalDrawer from "@/components/Custom/GlobalDrawer";
import { activateSsd, deactivateSsd, getAllSsd } from "@/api/ssd.api";
import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import { DataTable } from "@/components/Custom/DataTable";
import TableAction from "@/components/Custom/TableAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SSD } from "@/types/ssd.type";
import useFetchData from "@/hooks/useFetchData";
import { Switch } from "@/components/ui/switch";
import SsdCreationForm from "./SsdCreationForm";

const SsdListPage = () => {
  const setSelectedId = useGlobalStore((state) => state.setSelectedId);
  const setSelectedData = useGlobalStore((state) => state.setSelectedData);
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const openAlertModal = useGlobalStore((state) => state.openAlertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const { data, isLoading, refetch } = useFetchData(["ssd"], () => getAllSsd());

  // const { data, paginationComponent, isLoading, refetch, searchComponent } =
  //   useIndex({
  //     dependencies: ["project"],
  //     indexFn: getProjects,
  //   });

  const ssd: SSD[] = data?.data ?? [];

  const deactivateMutation = useMutation({
    mutationFn: deactivateSsd,
    onSuccess: () => {
      toast.success("SSD Deactivation Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });
  const activateMutation = useMutation({
    mutationFn: activateSsd,
    onSuccess: () => {
      toast.success("SSD Activation Successful");
      refetch();
      closeAlertModal();
    },
    onError: (error) => {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const actionItems = (data: SSD) => [
    {
      label: (
        <button
          onClick={() => {
            setSelectedData(data);
            openDrawer("update-ssd");
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
        <Button onClick={() => openDrawer("create-ssd")}>Create SSD</Button>
        {/* {searchComponent} */}
      </div>

      <DataTable
        isLoading={isLoading}
        data={ssd}
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "district",
            header: "District",
          },
          {
            accessorKey: "upozilla",
            header: "Upozilla",
          },
          {
            accessorKey: "cantonmentName",
            header: "Cantonment",
          },
          {
            header: "Active / Deactive",
            cell: ({ original }) => (
              <Switch
                checked={original?.isActive}
                onClick={() =>
                  original?.isActive
                    ? deactivateMutation.mutate({
                        ssd_id: original?.id as number,
                      })
                    : activateMutation.mutate({
                        ssd_id: original?.id as number,
                      })
                }
              />
            ),
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
      {/* {paginationComponent} */}
      {/* <Pagination /> */}

      <GlobalDrawer name="create-ssd">
        <SsdCreationForm operation="create" />
      </GlobalDrawer>
      <GlobalDrawer name="update-ssd">
        <SsdCreationForm operation="update" />
      </GlobalDrawer>

      {/* <GlobalAlertModal mutation={deactivateMutation} /> */}
    </div>
  );
};

export default SsdListPage;
