import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableShimmer from "./TableShimmer";

type Column<T> = {
  accessorKey?: keyof T;
  header: string;
  cell?: (row: { original: T }) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
};

export function DataTable<T>({ data, columns, isLoading }: DataTableProps<T>) {
  return (
    <div>
      {isLoading ? (
        <TableShimmer />
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0">
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className="px-4 py-3 text-muted-foreground"
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/50">
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className="px-4 py-2">
                        {column.cell
                          ? column.cell({ original: row })
                          : (row[
                              column.accessorKey as keyof T
                            ] as React.ReactNode)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// cell: ({ original }) => original?.name?.slice(0, 2),

{
  /* <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="pl-10">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length ? (
              projects.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-10">{invoice.name}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{invoice.address}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={projects.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div> */
}
