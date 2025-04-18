
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Store, 
  Settings, 
  Users, 
  Truck, 
  LogOut, 
  Menu, 
  X, 
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarProps = {
  role: "admin" | "warehouse" | "procurement" | null;
};

export function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const mobileCollapsed = isMobile ? true : collapsed;

  // Define navigation items based on role
  const getNavItems = () => {
    const rolePrefix = role ? `/${role}` : '';
    
    const commonItems = [
      {
        href: `/dashboard${rolePrefix}`,
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: `/reports${rolePrefix}`,
        label: "Reports",
        icon: BarChart3,
      },
      {
        href: `/settings${rolePrefix}`,
        label: "Settings",
        icon: Settings,
      },
      {
        href: `/help${rolePrefix}`,
        label: "Help & FAQ",
        icon: HelpCircle,
      }
    ];

    const roleSpecificItems = {
      admin: [
        {
          href: "/users",
          label: "User Management",
          icon: Users,
        },
      ],
      warehouse: [
        {
          href: "/inventory",
          label: "Inventory",
          icon: Package,
        },
        {
          href: "/transfers",
          label: "Transfers",
          icon: Truck,
        },
        {
          href: "/surplus",
          label: "Surplus Items",
          icon: Store,
        },
      ],
      procurement: [
        {
          href: "/procurement",
          label: "Procurement",
          icon: ShoppingCart,
        },
      ],
    };

    return role ? [...commonItems, ...(roleSpecificItems[role] || [])] : commonItems;
  };

  const navItems = getNavItems();

  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground h-full flex flex-col transition-all duration-300 ease-in-out border-r border-sidebar-border relative",
        mobileCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-[-40px] text-foreground bg-background/90 rounded-full z-50"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      )}

      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        {!mobileCollapsed ? (
          <h1 className="font-bold text-xl text-sidebar-foreground">ConstructWMS</h1>
        ) : (
          <span className="text-xl font-bold">C</span>
        )}
      </div>
      
      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <div className="flex-1 py-6 overflow-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-2 py-2.5 text-sm rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn("h-5 w-5", !mobileCollapsed && "mr-3")}
              />
              {!mobileCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="p-4">
        <Link
          to="/auth/logout"
          className="flex items-center px-2 py-2.5 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className={cn("h-5 w-5", !mobileCollapsed && "mr-3")} />
          {!mobileCollapsed && <span>Logout</span>}
        </Link>
      </div>

      {/* Desktop sidebar toggle */}
      {!isMobile && (
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      )}
    </div>
  );
}
