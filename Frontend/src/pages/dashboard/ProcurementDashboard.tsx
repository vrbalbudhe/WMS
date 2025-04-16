
import { useState } from "react";
import { 
  ShoppingCart, 
  TrendingUp, 
  FileBarChart, 
  DownloadIcon,
  Filter,
  CalendarRange,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/layout/Layout";
import { StatCards } from "@/components/dashboard/StatCards";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { ProcurementTable } from "@/components/dashboard/procurement/ProcurementTable";
import type { StatCard, AlertItem, ProcurementItem } from "@/types/dashboard";

export default function ProcurementDashboard() {
  const user = {
    name: "Taylor Reynolds",
    role: "Procurement Officer" as const,
    avatar: "",
  };

  // Sample procurement data
  const procurementItems: ProcurementItem[] = [
    {
      id: "PO-2023-054",
      name: "Portland Cement",
      quantity: 200,
      unit: "Bags",
      supplier: "BuildMaster Supplies",
      status: "recommended",
      justification: "Below reorder level (30%)",
      lastOrdered: "45 days ago",
      priority: "high",
    },
    {
      id: "PO-2023-055",
      name: "Rebar (12mm)",
      quantity: 50,
      unit: "Bundles",
      supplier: "Steel Solutions Inc.",
      status: "pending",
      justification: "Manual request",
      lastOrdered: "60 days ago",
      priority: "medium",
    },
    {
      id: "PO-2023-056",
      name: "Safety Helmets",
      quantity: 25,
      unit: "Units",
      supplier: "SafetyFirst Equipment",
      status: "approved",
      justification: "Safety regulations",
      lastOrdered: "90 days ago",
      priority: "high",
    },
    {
      id: "PO-2023-057",
      name: "Paint (White)",
      quantity: 40,
      unit: "Buckets",
      supplier: "ColorTech Industries",
      status: "ordered",
      justification: "Critical level reached",
      lastOrdered: "21 days ago",
      priority: "critical",
    },
    {
      id: "PO-2023-058",
      name: "Plywood Sheets",
      quantity: 100,
      unit: "Sheets",
      supplier: "Woodland Materials",
      status: "recommended",
      justification: "Forecasted demand",
      lastOrdered: "75 days ago",
      priority: "low",
    },
  ];

  // Sample history data
  const procurementHistory = [
    {
      id: "PO-2023-042",
      date: "Oct 15, 2023",
      items: 12,
      totalValue: "$12,450.00",
      supplier: "BuildMaster Supplies",
      status: "delivered",
    },
    {
      id: "PO-2023-041",
      date: "Oct 8, 2023",
      items: 8,
      totalValue: "$5,320.00",
      supplier: "Steel Solutions Inc.",
      status: "in-transit",
    },
    {
      id: "PO-2023-040",
      date: "Oct 1, 2023",
      items: 15,
      totalValue: "$8,760.00",
      supplier: "SafetyFirst Equipment",
      status: "delivered",
    },
    {
      id: "PO-2023-039",
      date: "Sept 25, 2023",
      items: 6,
      totalValue: "$3,200.00",
      supplier: "ColorTech Industries",
      status: "delivered",
    },
  ];

  // Alerts & notifications
  const alerts: AlertItem[] = [
    {
      id: "ALT-P001",
      type: "Inventory",
      message: "Critical stock levels: Portland Cement",
      level: "critical",
      time: "2 hours ago",
    },
    {
      id: "ALT-P002",
      type: "Procurement",
      message: "New price quote received from Steel Solutions Inc.",
      level: "info",
      time: "Yesterday",
    },
    {
      id: "ALT-P003",
      type: "Shipment",
      message: "Order #PO-2023-041 has shipped",
      level: "success",
      time: "Yesterday",
    },
    {
      id: "ALT-P004",
      type: "Approval",
      message: "Approval needed: Safety equipment request",
      level: "pending",
      time: "2 days ago",
    },
  ];
  
  // Define the stats data
  const stats: StatCard[] = [
    {
      title: "Open Orders",
      value: 8,
      change: "+2",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Pending Approvals",
      value: 4,
      change: "-1",
      icon: TrendingUp,
      trend: "down",
    },
    {
      title: "Monthly Spend",
      value: "$24,500",
      change: "+12%",
      icon: FileBarChart,
      trend: "up",
    },
    {
      title: "Items at Critical",
      value: 3,
      change: "+2",
      icon: DownloadIcon,
      trend: "up",
    },
  ];

  return (
    <Layout role="procurement" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Procurement Dashboard</h1>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create New Order
            </Button>
          </div>
        </div>

        <StatCards stats={stats} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="procurement" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="procurement">Procurement</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <CalendarRange className="h-3.5 w-3.5 mr-1" />
                    Date
                  </Button>
                </div>
              </div>

              <TabsContent value="procurement">
                <Card>
                  <CardHeader>
                    <CardTitle>Procurement Actions</CardTitle>
                    <CardDescription>
                      Manage procurement requests and automated suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ProcurementTable items={procurementItems} />
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <Button variant="link" size="sm">
                      View All Items
                    </Button>
                    <Button variant="default" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Place Orders
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Procurement History</CardTitle>
                    <CardDescription>
                      Review previous orders and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {procurementHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.totalValue}</TableCell>
                            <TableCell>{order.supplier}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.status === "delivered"
                                    ? "success"
                                    : order.status === "in-transit"
                                    ? "default"
                                    : "warning"
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <Button variant="link" size="sm">
                      View All Orders
                    </Button>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export History
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Procurement Analytics</CardTitle>
                    <CardDescription>
                      Trends and insights for procurement data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                      <div className="text-center">
                        <FileBarChart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-lg font-medium">Analytics Charts</h3>
                        <p className="text-sm text-muted-foreground max-w-[250px] mx-auto mt-2">
                          Here you'll see procurement trends, supplier performance, and cost analysis charts.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <AlertsList alerts={alerts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
