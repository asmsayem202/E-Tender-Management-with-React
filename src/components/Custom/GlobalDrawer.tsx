import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useGlobalStore } from "@/store/store";

const GlobalDrawer = ({ name, children }: any) => {
  const isMobile = useIsMobile();
  const drawer = useGlobalStore((state) => state.drawer);
  const closeDrawer = useGlobalStore((state) => state.closeDrawer);
  if (name === drawer)
    return (
      <Drawer
        open={name === drawer}
        onOpenChange={() => closeDrawer()}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    );
};

export default GlobalDrawer;
