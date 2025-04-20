import React, { useState } from 'react';
import { 
  FaBoxOpen, 
  FaTruck, 
  FaExclamationTriangle, 
  FaClock, 
  FaBox,
  FaSearchPlus,
  FaChartLine, 
  FaClipboardList,
  FaFileAlt,
  FaPlus,
  FaEye
} from 'react-icons/fa';

// Dashboard Components
import InventorySummary from '../../components/warehouse/dashboard/InventorySummary';
import RecentShipments from '../../components/warehouse/dashboard/RecentShipments';
import RecentReceivings from '../../components/warehouse/dashboard/RecentReceivings';
import LowStockItems from '../../components/warehouse/dashboard/LowStockItems';
import QuickActions from '../../components/warehouse/dashboard/QuickActions';
import InventoryChart from '../../components/warehouse/dashboard/InventoryChart';

const WarehouseDashboard = () => {
  // Sample data - in a real application, you would fetch this from an API
  const summaryData = {
    totalItems: 1256,
    lowStock: 18,
    outOfStock: 5,
    pendingReceipts: 32
  };

  const recentShipments = [
    { id: 'SH-1023', date: '2025-04-16', status: 'Delivered', destination: 'Main Store', items: 15 },
    { id: 'SH-1022', date: '2025-04-15', status: 'In Transit', destination: 'North Branch', items: 8 },
    { id: 'SH-1021', date: '2025-04-14', status: 'Processing', destination: 'South Branch', items: 12 },
    { id: 'SH-1020', date: '2025-04-13', status: 'Delivered', destination: 'East Branch', items: 5 }
  ];

  const recentReceivings = [
    { id: 'RCV-0893', date: '2025-04-17', vendor: 'Tech Supplies Inc.', status: 'Pending Inspection', items: 24 },
    { id: 'RCV-0892', date: '2025-04-16', vendor: 'Office Essentials', status: 'Received', items: 18 },
    { id: 'RCV-0891', date: '2025-04-15', vendor: 'Global Hardware', status: 'Received', items: 32 },
    { id: 'RCV-0890', date: '2025-04-14', vendor: 'Quality Products', status: 'Verified', items: 15 }
  ];

  const lowStockItems = [
    { id: 'ITM-2035', name: 'Office Chair - Ergonomic', currentStock: 5, minRequired: 10, category: 'Furniture' },
    { id: 'ITM-1867', name: 'Printer Toner - Black', currentStock: 3, minRequired: 15, category: 'Office Supplies' },
    { id: 'ITM-1942', name: 'Desktop Computer - Model X', currentStock: 2, minRequired: 5, category: 'Electronics' },
    { id: 'ITM-2103', name: 'First Aid Kit', currentStock: 1, minRequired: 8, category: 'Safety' },
    { id: 'ITM-1756', name: 'Paper - A4', currentStock: 8, minRequired: 20, category: 'Office Supplies' }
  ];

  const quickActions = [
    { icon: <FaPlus />, label: 'Receive Items', action: () => console.log('Receive Items clicked') },
    { icon: <FaTruck />, label: 'Create Shipment', action: () => console.log('Create Shipment clicked') },
    { icon: <FaSearchPlus />, label: 'Stock Count', action: () => console.log('Stock Count clicked') },
    { icon: <FaClipboardList />, label: 'Generate Report', action: () => console.log('Generate Report clicked') }
  ];

  // Sample chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        name: 'Inventory Level',
        data: [1200, 1350, 1250, 1400, 1300, 1256]
      },
      {
        name: 'Shipments',
        data: [85, 102, 92, 120, 95, 88]
      }
    ]
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Warehouse Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Inventory Summary */}
      <InventorySummary data={summaryData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Chart */}
        <InventoryChart data={chartData} />
        
        {/* Low Stock Items */}
        <LowStockItems items={lowStockItems} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <RecentShipments shipments={recentShipments} />
        
        {/* Recent Receivings */}
        <RecentReceivings receivings={recentReceivings} />
      </div>
      
      {/* Quick Actions */}
      <QuickActions actions={quickActions} />
    </div>
  );
};

export default WarehouseDashboard;