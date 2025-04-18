
import { Users, Package, AlertTriangle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { StatCards } from "@/components/dashboard/StatCards";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { ActivityLog } from "@/components/dashboard/admin/ActivityLog";
import type { StatCard, ActivityItem, AlertItem } from "@/types/dashboard";

export default function AdminDashboard() {
  const user = {
    name: "Alex Johnson",
    role: "Administrator" as const,
    avatar: "",
  };

  const stats: StatCard[] = [
    {
      title: "Users",
      value: 24,
      change: "+2",
      icon: Users,
      trend: "up",
    },
    {
      title: "Warehouses",
      value: 3,
      change: "0",
      icon: Package,
      trend: "neutral",
    },
    {
      title: "Critical Alerts",
      value: 5,
      change: "-2",
      icon: AlertTriangle,
      trend: "down",
    },
    {
      title: "Pending Transfers",
      value: 12,
      change: "+3",
      icon: Truck,
      trend: "up",
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: "ACT-1234",
      user: "Sarah Thompson",
      action: "Added new warehouse location",
      timestamp: "10 minutes ago",
    },
    {
      id: "ACT-1233",
      user: "Mike Reynolds",
      action: "Updated inventory items (34)",
      timestamp: "45 minutes ago",
    },
    {
      id: "ACT-1232",
      user: "Tara Wilson",
      action: "Approved procurement request #PR-2023",
      timestamp: "2 hours ago",
    },
    {
      id: "ACT-1231",
      user: "John Davis",
      action: "Transfer request submitted",
      timestamp: "5 hours ago",
    },
    {
      id: "ACT-1230",
      user: "Emma Clark",
      action: "New user registration",
      timestamp: "Yesterday",
    },
  ];

  const alertItems: AlertItem[] = [
    {
      id: "ALT-001",
      type: "Inventory",
      message: "Multiple items below reorder threshold",
      level: "critical",
      time: "32 minutes ago",
    },
    {
      id: "ALT-002",
      type: "System",
      message: "Database backup completed successfully",
      level: "info",
      time: "2 hours ago",
    },
    {
      id: "ALT-003",
      type: "Security",
      message: "Failed login attempts detected",
      level: "warning",
      time: "Yesterday, 11:52 PM",
    },
    {
      id: "ALT-004",
      type: "Transfer",
      message: "Transfer #TR-8842 awaiting approval",
      level: "pending",
      time: "Yesterday, 3:30 PM",
    },
    {
      id: "ALT-005",
      type: "System",
      message: "Software update available",
      level: "info",
      time: "2 days ago",
    },
  ];

  return (
    <Layout role="admin" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button>Generate Report</Button>
        </div>

        <StatCards stats={stats} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <ActivityLog activities={recentActivity} />
              </TabsContent>
              
              <TabsContent value="warehouses">
                <Card>
                  <CardHeader>
                    <CardTitle>Warehouse Overview</CardTitle>
                    <CardDescription>
                      Statistics and performance of all warehouse locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Select a warehouse to view detailed analytics and inventory data.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      User accounts and role assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View, add, and modify user accounts with role-based access control.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <AlertsList alerts={alertItems} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
