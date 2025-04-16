
import { InventoryItem } from '@/types/dashboard';
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface InventoryGridProps {
  items: InventoryItem[];
}

export function InventoryGrid({ items }: InventoryGridProps) {
  return (
    <Card>
      <CardContent className="p-0 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div 
              key={item.id}
              className="flex border rounded-md overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="w-[100px] h-[100px] bg-muted flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-3 flex-grow">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge
                      variant={
                        item.status === "normal"
                          ? "success"
                          : item.status === "low"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    SKU: {item.sku} | {item.category}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm font-medium">
                    <span>
                      {item.quantity} {item.unit}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      (Min: {item.reorderLevel})
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-3">
        <Button variant="outline" className="w-full" size="sm">
          View All Inventory Items
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
