
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  ShoppingCart, 
  Download, 
  Filter, 
  Building2, 
  PackageCheck,
  ReceiptText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcurementTable } from "@/components/dashboard/procurement/ProcurementTable";
import { ProcurementItem } from "@/types/dashboard";

export default function ProcurementMain() {
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
    {
      id: "PO-2023-059",
      name: "Insulation Material",
      quantity: 30,
      unit: "Rolls",
      supplier: "EcoInsulate Co.",
      status: "pending",
      justification: "Project requirement",
      lastOrdered: "120 days ago",
      priority: "medium",
    },
  ];

  // Sample suppliers
  const suppliers = [
    {
      id: "SUP-001",
      name: "BuildMaster Supplies",
      category: "Building Materials",
      rating: 4.8,
      activeOrders: 3,
    },
    {
      id: "SUP-002",
      name: "Steel Solutions Inc.",
      category: "Metals & Steel",
      rating: 4.5,
      activeOrders: 1,
    },
    {
      id: "SUP-003",
      name: "SafetyFirst Equipment",
      category: "Safety Gear",
      rating: 4.9,
      activeOrders: 2,
    },
    {
      id: "SUP-004",
      name: "ColorTech Industries",
      category: "Paints & Finishes",
      rating: 4.2,
      activeOrders: 0,
    },
  ];

  return (
    <Layout role="procurement" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Procurement Management</h1>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create New Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Open Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">+2</span> from previous period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approvals
              </CardTitle>
              <ReceiptText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500 font-medium">-1</span> from previous period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Suppliers
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">+1</span> from previous period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivered This Month
              </CardTitle>
              <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">+5</span> from previous period
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="relative w-[250px]">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-3.5 w-3.5 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Procurement Orders</CardTitle>
                <CardDescription>
                  Manage procurement requests and orders
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ProcurementTable items={procurementItems} />
              </CardContent>
              <CardFooter className="flex justify-between border-t p-3">
                <Button variant="link" size="sm">
                  View All Orders
                </Button>
                <Button variant="default" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Place Orders
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Management</CardTitle>
                <CardDescription>
                  Manage supplier relationships and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div
                      key={supplier.id}
                      className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium">{supplier.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {supplier.category} • Rating: {supplier.rating}/5.0
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">
                          {supplier.activeOrders} active orders
                        </span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-3">
                <Button variant="link" size="sm">
                  View All Suppliers
                </Button>
                <Button variant="default" size="sm">
                  <Building2 className="h-4 w-4 mr-2" />
                  Add Supplier
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
                    <ReceiptText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
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
    </Layout>
  );
}
