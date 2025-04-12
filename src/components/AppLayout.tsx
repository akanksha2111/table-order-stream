
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import { MainNav } from "./MainNav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { 
  LayoutGrid, 
  Utensils, 
  BarChart4, 
  History,
  UserCircle
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      title: "Menu",
      href: "/",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      title: "Tables",
      href: "/",
      icon: <BarChart4 className="h-5 w-5" />,
    },
    {
      title: "History",
      href: "/",
      icon: <History className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/",
      icon: <UserCircle className="h-5 w-5" />,
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar defaultCollapsed={false} className="border-r">
          <div className="flex flex-col h-full">
            <div className="py-4 px-2">
              <div className="mb-4 flex items-center px-2 py-2">
                <Utensils className="mr-2 h-6 w-6" />
                <h1 className="text-lg font-semibold">HotelBill</h1>
              </div>
            </div>
            <SidebarContent>
              <nav className="flex-1 px-2 py-2 space-y-1">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-md",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      "transition-colors duration-200",
                      index === 0 ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </a>
                ))}
              </nav>
            </SidebarContent>
            <div className="p-4 border-t border-sidebar-border mt-auto">
              <div className="flex items-center">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground">
                  <span className="font-medium">S</span>
                </div>
                <div className="ml-3 text-sm">
                  <p className="font-medium text-sidebar-foreground">Staff</p>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 flex items-center justify-between border-b px-4 lg:px-6 bg-background">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <MainNav />
            </div>
            <ThemeSwitcher />
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
