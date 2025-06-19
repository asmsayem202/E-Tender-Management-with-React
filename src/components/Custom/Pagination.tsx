import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
const fakeInvoices = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    invoice: "INV002",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$180.00",
  },
  { invoice: "INV003", status: "Paid", method: "PayPal", amount: "$320.00" },
  {
    invoice: "INV004",
    status: "Failed",
    method: "Credit Card",
    amount: "$75.00",
  },
  {
    invoice: "INV005",
    status: "Paid",
    method: "Debit Card",
    amount: "$400.00",
  },
  {
    invoice: "INV006",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$220.00",
  },
  { invoice: "INV007", status: "Paid", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV008",
    status: "Failed",
    method: "Credit Card",
    amount: "$95.00",
  },
  {
    invoice: "INV009",
    status: "Paid",
    method: "Debit Card",
    amount: "$370.00",
  },
  { invoice: "INV010", status: "Pending", method: "Cash", amount: "$130.00" },
];
const Pagination = () => {
  return (
    <div className="flex items-center justify-between pl-2  mt-5">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        1 of {fakeInvoices.length} row(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>

          <Select>
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {fakeInvoices.length} of {fakeInvoices.length}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" className="size-8" size="icon">
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button variant="outline" className="size-8" size="icon">
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
