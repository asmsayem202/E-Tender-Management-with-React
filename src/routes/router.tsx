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
        path: "perishable-product/parent-category-list",
        element: <ParentCategoryListPage />,
      },
      {
        path: "perishable-product/category-list",
        element: <CategoryListPage />,
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
