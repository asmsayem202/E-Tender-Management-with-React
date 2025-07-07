import * as React from "react";
import {
  CircleDollarSign,
  FolderGit,
  LayoutDashboardIcon,
  NotebookTabs,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  SquareChartGantt,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { Link } from "react-router-dom";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "SSD & BSD Management",
      url: "ssd-bsd",
      icon: NotebookTabs,
      items: [
        {
          title: "SSD",
          active: "ssd-list",
          url: "ssd-bsd/ssd-list",
          icon: SquareChartGantt,
        },
        {
          title: "BSD",
          active: "bsd-list",
          url: "ssd-bsd/bsd-list",
          icon: SquareChartGantt,
        },
      ],
    },
    {
      title: "Supplier Management",
      url: "supplier-management",
      icon: UsersRound,
      items: [
        {
          title: "Suppliers",
          active: "suppliers-list",
          url: "supplier-management/suppliers-list",
          icon: SquareChartGantt,
        },
        {
          title: "Warning",
          active: "warning-list",
          url: "supplier-management/warning-list",
          icon: SquareChartGantt,
        },
        {
          title: "Supplier Warning",
          active: "supplier-warning-list",
          url: "supplier-management/supplier-warning-list",
          icon: SquareChartGantt,
        },
        {
          title: "Blacklist Supplier",
          active: "supplier-blacklist-list",
          url: "supplier-management/supplier-blacklist-list",
          icon: SquareChartGantt,
        },
      ],
    },
    {
      title: "Perishable Item",
      url: "perishable-product",
      icon: ShoppingBasket,
      items: [
        {
          title: "Parent Category",
          active: "parent-category-list",
          url: "perishable-product/parent-category-list",
          icon: SquareChartGantt,
        },
        {
          title: "Category",
          active: "category-list",
          url: "perishable-product/category-list",
          icon: SquareChartGantt,
        },
        {
          title: "Unit",
          active: "unit-list",
          url: "perishable-product/unit-list",
          icon: SquareChartGantt,
        },
        {
          title: "Item",
          active: "item-list",
          url: "perishable-product/item-list",
          icon: SquareChartGantt,
        },
      ],
    },
    {
      title: "Reasonable Rate",
      url: "reasonable-rate",
      icon: CircleDollarSign,
      items: [
        {
          title: "Factor",
          active: "factor-list",
          url: "reasonable-rate/factor-list",
          icon: SquareChartGantt,
        },
        {
          title: "Markets",
          active: "markets-list",
          url: "reasonable-rate/markets-list",
          icon: SquareChartGantt,
        },
        {
          title: "Market Rate",
          active: "market-rate-list",
          url: "reasonable-rate/market-rate-list",
          icon: SquareChartGantt,
        },
        {
          title: "Reasonable Rate",
          active: "reasonable-rate-list",
          url: "reasonable-rate/reasonable-rate-list",
          icon: SquareChartGantt,
        },
      ],
    },
    {
      title: "Tender Management",
      url: "tender",
      icon: FolderGit,
      items: [
        {
          title: "Format",
          active: "format",
          url: "tender/format",
          icon: SquareChartGantt,
        },
        {
          title: "Price",
          active: "price-list",
          url: "tender/price-list",
          icon: SquareChartGantt,
        },
        {
          title: "Price",
          active: "price-list",
          url: "tender/price-list",
          icon: SquareChartGantt,
        },
        {
          title: "Tender",
          active: "tender",
          url: "tender/tender",
          icon: SquareChartGantt,
        },
      ],
    },
    {
      title: "Role Authorization",
      url: "role-authorization",
      icon: ShieldCheck,
      items: [
        {
          title: "Role",
          active: "role-list",
          url: "role-authorization/role-list",
          icon: SquareChartGantt,
        },
        {
          title: "Permission",
          active: "permission-list",
          url: "role-authorization/permission-list",
          icon: SquareChartGantt,
        },
        {
          title: "User",
          active: "user-list",
          url: "role-authorization/user-list",
          icon: SquareChartGantt,
        },
      ],
    },
    {
      title: "Settings",
      url: "setting",
      icon: Settings,
      items: [
        {
          title: "Cantonment",
          active: "cantonment-list",
          url: "setting/cantonment-list",
          icon: SquareChartGantt,
        },
        {
          title: "Department",
          active: "department-list",
          url: "setting/department-list",
          icon: SquareChartGantt,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard" className="flex items-center space-x-2">
                <img
                  src="/src/assets/logo.png"
                  alt="Logo"
                  className="h-8 w-8"
                />
                <span className="text-base font-semibold">E-TENDER</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
