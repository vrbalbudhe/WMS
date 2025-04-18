import { useState } from "react";
import {
  Clipboard,
  Clock,
  TruckIcon,
  PackageCheck,
  AlertTriangle,
} from "lucide-react";

export default function ReceivingQueueDashboard() {
  const [receivingData, setReceivingData] = useState({
    pendingReceipts: [
      {
        id: "PO-2023-056",
        supplier: "Global Electronics",
        status: "Arrived",
        eta: null,
        items: 42,
        priority: "High",
        dock: "Bay 3",
        arrivalTime: "08:45 AM",
      },
      {
        id: "PO-2023-057",
        supplier: "Acme Supplies",
        status: "In Transit",
        eta: "10:30 AM",
        items: 17,
        priority: "Medium",
        dock: "Bay 1",
        arrivalTime: null,
      },
      {
        id: "PO-2023-058",
        supplier: "Metro Logistics",
        status: "Scheduled",
        eta: "11:15 AM",
        items: 28,
        priority: "Low",
        dock: "Bay 4",
        arrivalTime: null,
      },
      {
        id: "PO-2023-059",
        supplier: "Tech Parts Inc",
        status: "Delayed",
        eta: "02:30 PM",
        items: 53,
        priority: "High",
        dock: "Bay 2",
        arrivalTime: null,
      },
      {
        id: "PO-2023-060",
        supplier: "Office Depot",
        status: "Arrived",
        eta: null,
        items: 12,
        priority: "Medium",
        dock: "Bay 5",
        arrivalTime: "09:20 AM",
      },
    ],
    summaryStats: {
      totalToday: 12,
      arrived: 2,
      inTransit: 3,
      scheduled: 5,
      delayed: 2,
    },
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Arrived":
        return <PackageCheck size={18} className="text-green-600" />;
      case "In Transit":
        return <TruckIcon size={18} className="text-blue-600" />;
      case "Scheduled":
        return <Clock size={18} className="text-gray-600" />;
      case "Delayed":
        return <AlertTriangle size={18} className="text-amber-600" />;
      default:
        return <Clipboard size={18} className="text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${classes[priority]}`}
      >
        {priority}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Receiving Queue</h2>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Total Today</div>
            <div className="text-xl font-bold text-gray-800">
              {receivingData.summaryStats.totalToday}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-green-500">Arrived</div>
            <div className="text-xl font-bold text-green-600">
              {receivingData.summaryStats.arrived}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-blue-500">In Transit</div>
            <div className="text-xl font-bold text-blue-600">
              {receivingData.summaryStats.inTransit}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-amber-500">Delayed</div>
            <div className="text-xl font-bold text-amber-600">
              {receivingData.summaryStats.delayed}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Purchase Order
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Supplier
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dock
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ETA/Arrival
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {receivingData.pendingReceipts.map((receipt) => (
              <tr key={receipt.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {receipt.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {receipt.supplier}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    {getStatusIcon(receipt.status)}
                    <span className="ml-2">{receipt.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {receipt.items}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {getPriorityBadge(receipt.priority)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {receipt.dock}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {receipt.arrivalTime || receipt.eta || "Not scheduled"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
