
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Sun, 
  Moon, 
  Search, 
  User,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type HeaderProps = {
  user: {
    name: string;
    role: "Administrator" | "Warehouse Manager" | "Procurement Officer";
    avatar?: string;
  };
};

export function Header({ user }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="bg-background border-b border-border h-16 px-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left: Search bar */}
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search inventory, orders, users..."
          className="pl-8 bg-background w-full"
        />
      </div>

      {/* Right: User actions */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center",
                    "bg-destructive text-destructive-foreground"
                  )}
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <div className="p-3 border-b border-border hover:bg-accent rounded-sm cursor-pointer">
                <p className="font-medium text-sm">Low Stock Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Portland Cement (Item #2234) is below reorder level
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  30 minutes ago
                </p>
              </div>
              <div className="p-3 border-b border-border hover:bg-accent rounded-sm cursor-pointer">
                <p className="font-medium text-sm">Transfer Request Approved</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your transfer request #TR-2023-0456 has been approved
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 hours ago
                </p>
              </div>
              <div className="p-3 hover:bg-accent rounded-sm cursor-pointer">
                <p className="font-medium text-sm">System Update</p>
                <p className="text-xs text-muted-foreground mt-1">
                  System maintenance scheduled for Sunday, 2:00 AM
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 day ago
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/auth/logout">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
