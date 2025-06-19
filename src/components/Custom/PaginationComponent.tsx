import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: any;
  setPerPage: (perPage: any) => void;
  setCurrentPage: (currentPage: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  setPerPage,
  setCurrentPage,
}) => {
  return (
    <Pagination className="mt-4 w-full">
      <PaginationContent className="flex items-center justify-between w-full">
        <Select
          value={perPage.toString()}
          onValueChange={(value) => {
            const newPerPage = Number(value);
            setPerPage(newPerPage);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
          {/* Render first 5 pages */}
          {[...Array(Math.min(5, totalPages))].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => onPageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* Show ellipsis if there are more than 5 pages */}
          {totalPages > 5 && currentPage <= 5 && <PaginationEllipsis />}
          {/* Render pages dynamically if currentPage > 5 */}
          {totalPages > 5 &&
            currentPage > 5 &&
            [...Array(Math.min(5, totalPages - currentPage + 1))]
              .map((_, index) => index + currentPage)
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className="cursor-pointer"
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
          {/* Show ellipsis at the end if applicable */}
          {totalPages > 5 && currentPage < totalPages - 3 && (
            <PaginationEllipsis />
          )}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
