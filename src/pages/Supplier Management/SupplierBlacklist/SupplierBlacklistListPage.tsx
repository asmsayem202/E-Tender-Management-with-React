import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";
import { DataTable } from "@/components/Custom/DataTable";
import useFetchData from "@/hooks/useFetchData";
import { getAllSupplierBlacklist } from "@/api/supplier-blacklist.api";
import type { SUPPLIER_BLACKLIST } from "@/types/supplier-blacklist.type";

const SupplierBlacklistListPage = () => {
  const openDrawer = useGlobalStore((state) => state.openDrawer);
  const { data, isLoading } = useFetchData(["supplier-blacklist"], () =>
    getAllSupplierBlacklist()
  );

  const blacklists: SUPPLIER_BLACKLIST[] = data?.data ?? [];

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
        ]}
      />
    </div>
  );
};

export default SupplierBlacklistListPage;
