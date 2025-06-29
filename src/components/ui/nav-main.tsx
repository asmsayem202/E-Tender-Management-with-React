import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FileIcon, MailIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavMain({ items }: any) {
  const location = useLocation();
  const splitPath = location?.pathname?.split("/")?.[2];
  const splitPathChild = location?.pathname?.split("/")?.[3];

  const [openKey, setOpenKey] = useState<string | null>(null);

  // Automatically open the correct menu on route change
  useEffect(() => {
    const matchedParent = items.find((item: any) =>
      item.items?.some((sub: any) => sub.active === splitPathChild)
    );
    setOpenKey(matchedParent?.title ?? null);
  }, [splitPathChild, items]);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground"
            >
              <FileIcon />
              <span>All List</span>
            </SidebarMenuButton>
            <Button size="icon" className="h-9 w-9 shrink-0" variant="outline">
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item: any) => {
            const isOpen = openKey === item.title;

            if (item.items) {
              return (
                <Collapsible
                  key={item.title}
                  open={isOpen}
                  onOpenChange={(state) => {
                    setOpenKey(state ? item.title : null);
                  }}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem: any) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={splitPathChild === subItem.active}
                            >
                              <Link to={subItem?.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <Link key={item.title} to={item?.url}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={splitPath === item.url}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
