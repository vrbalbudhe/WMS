
import { ProcurementItem } from '@/types/dashboard';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, CheckCircle2, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProcurementTableProps {
  items: ProcurementItem[];
}

export function ProcurementTable({ items }: ProcurementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.id}
                </p>
              </div>
            </TableCell>
            <TableCell>
              {item.quantity} {item.unit}
            </TableCell>
            <TableCell>{item.supplier}</TableCell>
            <TableCell>
              <Badge
                variant={
                  item.status === "recommended"
                    ? "warning"
                    : item.status === "pending"
                    ? "secondary"
                    : item.status === "approved"
                    ? "success"
                    : "default"
                }
                className="whitespace-nowrap"
              >
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  item.priority === "critical"
                    ? "destructive"
                    : item.priority === "high"
                    ? "warning"
                    : item.priority === "medium"
                    ? "default"
                    : "secondary"
                }
                className="whitespace-nowrap"
              >
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                {(item.status === "recommended" || item.status === "pending") && (
                  <>
                    <Button size="sm" variant="success" className="h-8 w-8 p-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
