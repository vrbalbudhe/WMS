
import { AlertItem } from '@/types/dashboard';
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
import { AlertCircle } from "lucide-react";

interface AlertsListProps {
  alerts: AlertItem[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-md cursor-pointer"
            >
              <Badge
                variant={
                  alert.level === "critical"
                    ? "destructive"
                    : alert.level === "warning"
                    ? "warning"
                    : alert.level === "success"
                    ? "success"
                    : alert.level === "pending"
                    ? "secondary"
                    : "default"
                }
                className="mt-0.5 h-fit"
              >
                {alert.type}
              </Badge>
              <div className="space-y-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-3">
        <Button variant="outline" className="w-full" size="sm">
          View All Alerts
        </Button>
      </CardFooter>
    </Card>
  );
}
