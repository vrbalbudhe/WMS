
export type StatCard = {
  title: string;
  value: number | string;
  change: string;
  icon: any;
  trend: 'up' | 'down' | 'neutral' | 'warning' | 'destructive' | 'secondary';
};

export type ActivityItem = {
  id: string;
  user: string;
  action: string;
  timestamp: string;
};

export type AlertItem = {
  id: string;
  type: string;
  message: string;
  level: 'critical' | 'warning' | 'info' | 'pending' | 'success';
  time: string;
};

export type TransferItem = {
  id: string;
  source: string;
  destination: string;
  items: number;
  status: 'pending' | 'in-transit' | 'completed';
  requestedBy: string;
  date: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
  status: 'normal' | 'low' | 'critical';
  image: string;
};

export type ProcurementItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  supplier: string;
  status: 'recommended' | 'pending' | 'approved' | 'ordered';
  justification: string;
  lastOrdered: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
};
