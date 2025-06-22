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
        path: "/dashboard/ssd-bsd/ssd-list",
        element: <SsdListPage />,
      },
      {
        path: "/dashboard/ssd-bsd/bsd-list",
        element: <BsdListPage />,
      },
      {
        path: "/dashboard/setting/cantonment-list",
        element: <CantonmentListPage />,
      },
      {
        path: "role-authorization/role-list",
        element: <RoleListPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
