
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Truck, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransferItem } from "@/types/dashboard";

export default function Transfers() {
  const user = {
    name: "Chris Martinez",
    role: "Warehouse Manager" as const,
    avatar: "",
  };

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
    {
      id: "TR-4418",
      source: "Site A",
      destination: "Site B",
      items: 3,
      status: "completed",
      requestedBy: "Sarah Thompson",
      date: "Oct 10, 2023",
    },
    {
      id: "TR-4417",
      source: "Main Warehouse",
      destination: "Site D",
      items: 15,
      status: "in-transit",
      requestedBy: "Michael Brown",
      date: "Oct 5, 2023",
    }
  ];

  return (
    <Layout role="warehouse" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Transfer Management</h1>
          
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Create New Transfer
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">In Transit</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">24</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Total Items</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">243</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transfers</CardTitle>
                <CardDescription>Manage inventory transfers between locations</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search transfers..."
                  className="w-[200px] h-9"
                />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.id}</TableCell>
                    <TableCell>{transfer.source}</TableCell>
                    <TableCell>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell>{transfer.destination}</TableCell>
                    <TableCell>{transfer.items}</TableCell>
                    <TableCell>{transfer.requestedBy}</TableCell>
                    <TableCell>{transfer.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transfer.status === "completed"
                            ? "success"
                            : transfer.status === "in-transit"
                            ? "default"
                            : "warning"
                        }
                      >
                        {transfer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t p-3">
            <Button variant="link" className="ml-auto">
              View All Transfers
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
