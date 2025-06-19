import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AuthRouteProtection from "./AuthRouteProtection";
import GuestRouteProtection from "./GuestRouteProtection";
import LoginPage from "@/pages/Auth/LoginPage";
import PageNotFound from "@/pages/Error/PageNotFound";
import SsdListPage from "@/pages/Ssd/SsdListPage";
import BsdListPage from "@/pages/Bsd/BsdListPage";
import CantonmentListPage from "@/pages/Cantonment/CantonmentListPage";
import PdfViewer from "@/pages/PdfViewer";

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
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
