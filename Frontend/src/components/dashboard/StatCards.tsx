
import { StatCard } from '@/types/dashboard';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardsProps {
  stats: StatCard[];
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Badge 
                variant={
                  stat.trend === "up" 
                    ? "success" 
                    : stat.trend === "down" 
                      ? "destructive" 
                      : stat.trend === "warning"
                        ? "warning"
                        : stat.trend === "destructive"
                          ? "destructive"
                          : "secondary"
                } 
                className="mr-1 px-1 text-xs"
              >
                {stat.change}
              </Badge>
              <span>from previous period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
