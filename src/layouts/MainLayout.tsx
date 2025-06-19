import { AppSidebar } from "@/components/ui/app-sidebar";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui/site-header";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-4 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
