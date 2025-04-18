import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { InventoryGrid } from "@/components/dashboard/warehouse/InventoryGrid";
import { Search, QrCode, PlusCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { InventoryItem } from "@/types/dashboard";

export default function Inventory() {
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
      status: "normal",
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

  return (
    <Layout role="warehouse" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          
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

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <div className="text-sm text-muted-foreground">
              Showing {inventoryItems.length} items
            </div>
          </div>
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8 w-full h-9"
            />
          </div>
        </div>

        <InventoryGrid items={inventoryItems} />
      </div>
    </Layout>
  );
}
