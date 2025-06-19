import * as React from "react";
import {
  CheckCircle2,
  //   GripVertical,
  Loader2,
  //   MoreVertical,
  TrendingUp,
} from "lucide-react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { toast } from "sonner";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

type TableData = z.infer<typeof schema>;

interface ColumnDef<T> {
  id: string;
  header: string | React.ReactNode;
  cell: (row: T) => React.ReactNode;
  enableSorting?: boolean;
  enableHiding?: boolean;
}

interface TableProps {
  data: TableData[];
  columns: ColumnDef<TableData>[];
}

function useCustomTable({ data, columns }: TableProps) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [filterConfig, setFilterConfig] = React.useState<
    Record<string, string>
  >({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof TableData];
        const bValue = b[sortConfig.key as keyof TableData];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = React.useMemo(() => {
    return sortedData.filter((row) => {
      return Object.entries(filterConfig).every(([key, value]) => {
        if (!value) return true;
        return String(row[key as keyof TableData])
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });
  }, [sortedData, filterConfig]);

  const paginatedData = React.useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const setFilter = (key: string, value: string) => {
    setFilterConfig((prev) => ({ ...prev, [key]: value }));
  };

  return {
    data: paginatedData,
    totalRows: filteredData.length,
    totalPages,
    sortConfig,
    filterConfig,
    rowSelection,
    pagination,
    requestSort,
    setFilter,
    setRowSelection,
    setPagination,
    columns,
  };
}

// function DragHandle({ id }: { id: number }) {
//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       className="text-muted-foreground size-7 hover:bg-transparent"
//     >
//       <GripVertical className="text-muted-foreground size-3" />
//       <span className="sr-only">Drag to reorder</span>
//     </Button>
//   );
// }

const columns: ColumnDef<TableData>[] = [
  //   {
  //     id: "drag",
  //     header: () => null,
  //     cell: (row) => <DragHandle id={row.id} />,
  //   },
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <div className="flex items-center justify-center">
  //         <Checkbox
  //           checked={table.getIsAllRowsSelected()}
  //           onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
  //           aria-label="Select all"
  //         />
  //       </div>
  //     ),
  //     cell: (row) => (
  //       <div className="flex items-center justify-center">
  //         <Checkbox
  //           checked={row.getIsSelected()}
  //           onCheckedChange={(value) => row.toggleSelected(!!value)}
  //           aria-label="Select row"
  //         />
  //       </div>
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    id: "header",
    header: "Header",
    cell: (row) => <TableCellViewer item={row} />,
    enableHiding: false,
  },
  {
    id: "type",
    header: "Section Type",
    cell: (row) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.type}
        </Badge>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.status === "Done" ? (
          <CheckCircle2 className="fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader2 className="animate-spin" />
        )}
        {row.status}
      </Badge>
    ),
  },
  //   {
  //     id: "target",
  //     header: () => <div className="w-full text-right">Target</div>,
  //     cell: (row) => (
  //       <form
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
  //             loading: `Saving ${row.header}`,
  //             success: "Done",
  //             error: "Error",
  //           });
  //         }}
  //       >
  //         <Label htmlFor={`${row.id}-target`} className="sr-only">
  //           Target
  //         </Label>
  //         <Input
  //           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
  //           defaultValue={row.target}
  //           id={`${row.id}-target`}
  //         />
  //       </form>
  //     ),
  //   },
  //   {
  //     id: "limit",
  //     header: () => <div className="w-full text-right">Limit</div>,
  //     cell: (row) => (
  //       <form
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
  //             loading: `Saving ${row.header}`,
  //             success: "Done",
  //             error: "Error",
  //           });
  //         }}
  //       >
  //         <Label htmlFor={`${row.id}-limit`} className="sr-only">
  //           Limit
  //         </Label>
  //         <Input
  //           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
  //           defaultValue={row.limit}
  //           id={`${row.id}-limit`}
  //         />
  //       </form>
  //     ),
  //   },
  {
    id: "reviewer",
    header: "Reviewer",
    cell: (row) => {
      const isAssigned = row.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">
                Jamik Tashpulatov
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  //   {
  //     id: "actions",
  //     cell: () => (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             variant="ghost"
  //             className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
  //             size="icon"
  //           >
  //             <MoreVertical />
  //             <span className="sr-only">Open menu</span>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end" className="w-32">
  //           <DropdownMenuItem>Edit</DropdownMenuItem>
  //           <DropdownMenuItem>Make a copy</DropdownMenuItem>
  //           <DropdownMenuItem>Favorite</DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     ),
  //   },
];

export function DataTable({ data }: { data: TableData[] }) {
  const table = useCustomTable({
    data,
    columns,
  });

  return (
    <div className="space-y-4">
      <div className="">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10 ">
            <TableRow>
              {table.columns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.data.length > 0 ? (
              table.data.map((row) => (
                <TableRow key={row.id}>
                  {table.columns.map((column) => (
                    <TableCell key={`${row.id}-${column.id}`}>
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          {table.data.length} of {table.totalRows} row(s) displayed
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                table.setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(0, prev.pageIndex - 1),
                }))
              }
              disabled={table.pagination.pageIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                table.setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.min(table.totalPages - 1, prev.pageIndex + 1),
                }))
              }
              disabled={table.pagination.pageIndex >= table.totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: TableData }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input
                id="header"
                defaultValue={item.header}
                name={""}
                form={undefined}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  defaultValue={item.target}
                  name={""}
                  form={undefined}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input
                  id="limit"
                  defaultValue={item.limit}
                  name={""}
                  form={undefined}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
