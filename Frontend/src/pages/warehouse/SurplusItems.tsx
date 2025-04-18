
import Layout from "@/components/layout/Layout";
import { Store, PlusCircle, Search, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SurplusItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  condition: string;
  listPrice: string;
  status: "available" | "pending" | "sold";
  image: string;
};

export default function SurplusItems() {
  const user = {
    name: "Chris Martinez",
    role: "Warehouse Manager" as const,
    avatar: "",
  };

  const surplusItems: SurplusItem[] = [
    {
      id: "SUR-001",
      name: "Concrete Mixer",
      category: "Equipment",
      quantity: 1,
      unit: "Unit",
      condition: "Used - Good",
      listPrice: "$1,200",
      status: "available",
      image: "https://images.unsplash.com/photo-1571052654203-3f853dbe9e9a?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "SUR-002",
      name: "Timber Offcuts",
      category: "Materials",
      quantity: 150,
      unit: "kg",
      condition: "New - Surplus",
      listPrice: "$300",
      status: "sold",
      image: "https://images.unsplash.com/photo-1551043047-195ce3dd6d24?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "SUR-003",
      name: "Safety Harnesses",
      category: "Safety",
      quantity: 5,
      unit: "Sets",
      condition: "Used - Excellent",
      listPrice: "$600",
      status: "pending",
      image: "https://images.unsplash.com/photo-1569328922983-a908b4cb7174?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      id: "SUR-004",
      name: "PVC Pipes",
      category: "Materials",
      quantity: 25,
      unit: "Pieces",
      condition: "New - Surplus",
      listPrice: "$125",
      status: "available",
      image: "https://images.unsplash.com/photo-1589486255963-ddb976884cbe?q=80&w=100&h=100&auto=format&fit=crop"
    }
  ];

  return (
    <Layout role="warehouse" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Surplus Items</h1>
          
          <Button>
            <Store className="mr-2 h-4 w-4" />
            List New Surplus Item
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Available Items</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">18</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Items Sold</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">42</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Revenue Generated</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">$12,450</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Listed Items</h2>
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search surplus items..."
              className="pl-8 w-full h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {surplusItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge
                    variant={
                      item.status === "available"
                        ? "success"
                        : item.status === "pending"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 pb-0">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">{item.quantity} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Condition</p>
                    <p className="font-medium">{item.condition}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">List Price</p>
                    <p className="font-medium text-lg flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {item.listPrice.replace("$", "")}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                {item.status === "available" && (
                  <Button size="sm">Mark as Sold</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Load More Items
        </Button>
      </div>
    </Layout>
  );
}
