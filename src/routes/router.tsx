import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AuthRouteProtection from "./AuthRouteProtection";
import GuestRouteProtection from "./GuestRouteProtection";
import LoginPage from "@/pages/Auth/LoginPage";
import PageNotFound from "@/pages/Error/PageNotFound";
import CantonmentListPage from "@/pages/Settings/Cantonment/CantonmentListPage";
import PdfViewer from "@/pages/PdfViewer";
import SsdListPage from "@/pages/SSD & BSD Management/Ssd/SsdListPage";
import BsdListPage from "@/pages/SSD & BSD Management/Bsd/BsdListPage";
import RoleListPage from "@/pages/Role Authorization/Role/RoleListPage";
import DepartmentListPage from "@/pages/Settings/Department/DepartmentListPage";
import UserListPage from "@/pages/Role Authorization/User/UserListPage";
import PermissionListPage from "@/pages/Role Authorization/Permission/PermissionListPage";
import ParentCategoryListPage from "@/pages/Perishable-Item/Parent-category/ParentCategoryListPage";
import CategoryListPage from "@/pages/Perishable-Item/Category/CategoryListPage";
import UnitListPage from "@/pages/Perishable-Item/Unit/UnitListPage";
import ItemListPage from "@/pages/Perishable-Item/Item/ItemListPage";
import WarningListPage from "@/pages/Supplier Management/Warning/WarningListPage";
import SupplierListPage from "@/pages/Supplier Management/Suppliers/SupplierListPage";
import SupplierWarningListPage from "@/pages/Supplier Management/SupplierWarning/SupplierWarningListPage";
import SupplierBlacklistListPage from "@/pages/Supplier Management/SupplierBlacklist/SupplierBlacklistListPage";
import FactorListPage from "@/pages/Reasonable Rate/Factor/FactorListPage";
import MarketListPage from "@/pages/Reasonable Rate/Markets/MarketListPage";
import MarketPriceListPage from "@/pages/Reasonable Rate/Market Price/MarketPriceListPage";
import GuidelineListPage from "@/pages/Tender Management/Guideline/GuidelineListPage";
import GuidelineCreationForm from "@/pages/Tender Management/Guideline/GuidelineCreationForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRouteProtection>
        <LoginPage />
      </GuestRouteProtection>
    ),
  },
  {
    path: "/pdf/:supplierId",
    element: <PdfViewer />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthRouteProtection>
        <MainLayout />
      </AuthRouteProtection>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "ssd-bsd/ssd-list",
        element: <SsdListPage />,
      },
      {
        path: "ssd-bsd/bsd-list",
        element: <BsdListPage />,
      },
      {
        path: "supplier-management/suppliers-list",
        element: <SupplierListPage />,
      },
      {
        path: "supplier-management/warning-list",
        element: <WarningListPage />,
      },
      {
        path: "supplier-management/supplier-warning-list",
        element: <SupplierWarningListPage />,
      },
      {
        path: "supplier-management/supplier-blacklist-list",
        element: <SupplierBlacklistListPage />,
      },
      {
        path: "perishable-product/parent-category-list",
        element: <ParentCategoryListPage />,
      },
      {
        path: "perishable-product/category-list",
        element: <CategoryListPage />,
      },
      {
        path: "perishable-product/unit-list",
        element: <UnitListPage />,
      },
      {
        path: "perishable-product/item-list",
        element: <ItemListPage />,
      },
      {
        path: "reasonable-rate/factor-list",
        element: <FactorListPage />,
      },
      {
        path: "reasonable-rate/markets-list",
        element: <MarketListPage />,
      },
      {
        path: "reasonable-rate/market-rate-list",
        element: <MarketPriceListPage />,
      },
      {
        path: "tender/guideline-list",
        element: <GuidelineListPage />,
      },
      {
        path: "tender/guideline-list/dashboard/guideline-creation",
        element: <GuidelineCreationForm operation="create" />,
      },
      {
        path: "tender/guideline-list/dashboard/guideline-creation/:id",
        element: <GuidelineCreationForm operation="update" />,
      },
      {
        path: "setting/cantonment-list",
        element: <CantonmentListPage />,
      },
      {
        path: "setting/department-list",
        element: <DepartmentListPage />,
      },
      {
        path: "role-authorization/role-list",
        element: <RoleListPage />,
      },
      {
        path: "role-authorization/permission-list",
        element: <PermissionListPage />,
      },
      {
        path: "role-authorization/user-list",
        element: <UserListPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
