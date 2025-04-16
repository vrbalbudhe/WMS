
import { useState } from "react";
import { 
  PackageOpen, 
  Truck, 
  Store, 
  QrCode, 
  PlusCircle,
  Search,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { StatCards } from "@/components/dashboard/StatCards";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { InventoryGrid } from "@/components/dashboard/warehouse/InventoryGrid";
import type { StatCard, AlertItem, InventoryItem, TransferItem } from "@/types/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function WarehouseDashboard() {
  const user = {
    name: "Chris Martinez",
    role: "Warehouse Manager" as const,
    avatar: "",
  };

  // Sample inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: "INV-2231",
      name: "Portland Cement",
      sku: "CEM-001",
      category: "Building Materials",
      quantity: 120,
      unit: "Bags",
      reorderLevel: 50,
      lastUpdated: "Today, 10:23 AM",
      status: "normal", // normal, low, critical
      image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "INV-2232",
      name: "Rebar (12mm)",
      sku: "STL-012",
      category: "Steel",
      quantity: 45,
      unit: "Bundles",
      reorderLevel: 40,
      lastUpdated: "Today, 9:45 AM",
      status: "low",
      image: "https://images.unsplash.com/photo-1565876427310-71a2ffde11a3?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "INV-2233",
      name: "Bricks (Standard)",
      sku: "BRK-001",
      category: "Building Materials",
      quantity: 2400,
      unit: "Pieces",
      reorderLevel: 500,
      lastUpdated: "Yesterday",
      status: "normal",
      image: "https://images.unsplash.com/photo-1635543837048-5b387bd4f7e6?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "INV-2234",
      name: "Paint (White)",
      sku: "PNT-WHT",
      category: "Finishes",
      quantity: 8,
      unit: "Buckets",
      reorderLevel: 15,
      lastUpdated: "2 days ago",
      status: "critical",
      image: "https://images.unsplash.com/photo-1562155847-c05f7386b204?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "INV-2235",
      name: "Plywood (18mm)",
      sku: "WD-PLY-18",
      category: "Wood",
      quantity: 65,
      unit: "Sheets",
      reorderLevel: 20,
      lastUpdated: "Today, 8:15 AM",
      status: "normal",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "INV-2236",
      name: "Sand (Fine)",
      sku: "SND-FN",
      category: "Aggregates",
      quantity: 18,
      unit: "Tons",
      reorderLevel: 10,
      lastUpdated: "Yesterday",
      status: "low",
      image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=100&h=100&auto=format&fit=crop"
    },
  ];

  // Sample transfer data
  const transfers: TransferItem[] = [
    {
      id: "TR-4421",
      source: "Main Warehouse",
      destination: "Site A",
      items: 12,
      status: "pending",
      requestedBy: "John Smith",
      date: "Today",
    },
    {
      id: "TR-4420",
      source: "Site B",
      destination: "Main Warehouse",
      items: 5,
      status: "in-transit",
      requestedBy: "Emma Wilson",
      date: "Yesterday",
    },
    {
      id: "TR-4419",
      source: "Main Warehouse",
      destination: "Site C",
      items: 8,
      status: "completed",
      requestedBy: "Robert Johnson",
      date: "Oct 12, 2023",
    },
  ];

  // Sample alerts
  const alertItems: AlertItem[] = [
    {
      id: "ALT-001",
      type: "inventory",
      message: "Paint (White) is below critical level",
      level: "critical",
      time: "1 hour ago",
    },
    {
      id: "ALT-002",
      type: "transfer",
      message: "Transfer #TR-4421 awaiting your approval",
      level: "pending",
      time: "3 hours ago",
    },
    {
      id: "ALT-003",
      type: "surplus",
      message: "Surplus item sold: Timber offcuts",
      level: "success",
      time: "Yesterday",
    },
  ];

  const stats: StatCard[] = [
    {
      title: "Total Inventory Items",
      value: 583,
      change: "+24",
      icon: PackageOpen,
      trend: "up",
    },
    {
      title: "Pending Transfers",
      value: 8,
      change: "+3",
      icon: Truck,
      trend: "warning",
    },
    {
      title: "Low Stock Items",
      value: 12,
      change: "+5",
      icon: Store,
      trend: "destructive",
    },
    {
      title: "Surplus Items",
      value: 24,
      change: "18",
      icon: Store,
      trend: "secondary",
    },
  ];

  return (
    <Layout role="warehouse" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Warehouse Dashboard</h1>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Inventory
            </Button>
          </div>
        </div>

        <StatCards stats={stats} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="inventory" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="transfers">Transfers</TabsTrigger>
                  <TabsTrigger value="surplus">Surplus</TabsTrigger>
                </TabsList>
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inventory..."
                    className="pl-8 w-full h-9"
                  />
                </div>
              </div>
              
              <TabsContent value="inventory">
                <InventoryGrid items={inventoryItems} />
              </TabsContent>
              
              <TabsContent value="transfers">
                <Card>
                  <CardHeader>
                    <CardTitle>Transfer Management</CardTitle>
                    <CardDescription>
                      Track and manage inventory transfers between locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transfers.map((transfer) => (
                        <div
                          key={transfer.id}
                          className="flex items-center justify-between border rounded-md p-4 hover:bg-accent/50"
                        >
                          <div className="space-y-1">
                            <p className="font-medium flex items-center">
                              {transfer.id}
                              
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <span className="inline-flex items-center">
                                {transfer.source}
                                
                                {transfer.destination}
                              </span>
                              
                              <span>{transfer.items} items</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Requested by {transfer.requestedBy} • {transfer.date}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-3">
                    <Button variant="default" size="sm" className="w-full">
                      <Truck className="h-4 w-4 mr-2" />
                      Create New Transfer
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="surplus">
                <Card>
                  <CardHeader>
                    <CardTitle>Surplus Management</CardTitle>
                    <CardDescription>
                      List and manage surplus items for sale
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Create listings for surplus inventory items that can be sold to recover costs.
                    </p>
                  </CardContent>
                  <CardFooter className="border-t p-3">
                    <Button variant="default" size="sm" className="w-full">
                      <Store className="h-4 w-4 mr-2" />
                      List New Surplus Item
                    </Button>
                  </CardFooter>
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
