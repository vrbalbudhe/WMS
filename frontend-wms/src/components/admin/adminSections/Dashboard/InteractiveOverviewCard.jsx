import { useState } from "react";
import { BarChart3, Truck, Package, AlertCircle } from "lucide-react";

export default function InventoryOverviewCard() {
  const [inventoryData, setInventoryData] = useState({
    totalItems: 4250,
    lowStock: 32,
    outOfStock: 7,
    inTransit: 125,
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory Overview
        </h2>
        <BarChart3 className="text-blue-600" size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded-md">
          <div className="flex items-center mb-1">
            <Package className="mr-2 text-blue-600" size={18} />
            <span className="text-sm text-gray-600">Total Items</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {inventoryData.totalItems}
          </p>
        </div>

        <div className="p-3 bg-yellow-50 rounded-md">
          <div className="flex items-center mb-1">
            <AlertCircle className="mr-2 text-yellow-600" size={18} />
            <span className="text-sm text-gray-600">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {inventoryData.lowStock}
          </p>
        </div>

        <div className="p-3 bg-red-50 rounded-md">
          <div className="flex items-center mb-1">
            <AlertCircle className="mr-2 text-red-600" size={18} />
            <span className="text-sm text-gray-600">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {inventoryData.outOfStock}
          </p>
        </div>

        <div className="p-3 bg-green-50 rounded-md">
          <div className="flex items-center mb-1">
            <Truck className="mr-2 text-green-600" size={18} />
            <span className="text-sm text-gray-600">In Transit</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {inventoryData.inTransit}
          </p>
        </div>
      </div>
    </div>
  );
}
