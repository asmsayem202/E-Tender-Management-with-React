import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";

interface props {
  list: any[];
  trigger: ReactNode;
}

const TableAction = ({ list, trigger }: props) => {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {list &&
          list?.map((item, index) => (
            <DropdownMenuItem key={index} className="cursor-pointer">
              {item?.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
