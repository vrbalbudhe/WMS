// Path: frontend-wms/src/App.jsx

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Add missing imports
import { PublicLayout } from "./layouts/PublicLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import Homepage from "./pages/Homepage";
import React from "react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
// Admin
import { AdminLayout } from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserRegistration from "./pages/admin/UserRegistration";
import ProcurementOffInfo from "./pages/admin/ProcurementOfficerInfo";
import WarehouseOfficerInfo from "./pages/admin/WarehouseOfficerInfo";
// New Warehouse Management Pages
import WarehouseManagement from "./pages/admin/WarehouseManagement";
import WarehouseSettings from "./pages/admin/WarehouseSettings";
// WareHouse Officer
import { WarehouseLayout } from "./layouts/WarehouseLayout";
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import InventoryManagement from "./pages/warehouse/InventoryManagement";
import ShipmentTracking from "./pages/warehouse/ShipmentTracking";
import StockReports from "./pages/warehouse/StockReports";
// Procurement Officer
import { ProcurementLayout } from "./layouts/ProcurementLayout";
import ProcurementDashboard from "./pages/procurement/ProcurementDashboard";
import PurchaseRequests from "./pages/procurement/PurchaseRequests";
import VendorManagement from "./pages/procurement/VendorManagement";
import PurchaseOrders from "./pages/procurement/PurchaseOrders";
import ProcurementReports from "./pages/procurement/ProcurementReports";
import ProductScanPage from "./components/WarehouseManager/Scan/ProductScanPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
      ],
    },
    {
      path: "/user",
      element: <ProtectedLayout />,
      children: [
        {
          path: ":id",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },

        {
          path: "procurement-officers",
          element: <ProcurementOffInfo />,
        },
        {
          path: "create-users",
          element: <UserRegistration />,
        },
        {
          path: "warehouse-officers",
          element: <WarehouseOfficerInfo />,
        },
        // Add new warehouse management routes
        {
          path: "warehouses",
          element: <WarehouseManagement />,
        },
        {
          path: "warehouse-settings",
          element: <WarehouseSettings />,
        },
      ],
    },
    // New routes for warehouse manager
    {
      path: "/warehouse",
      element: <WarehouseLayout />,
      children: [
        {
          path: "dashboard",
          element: <WarehouseDashboard />,
        },
        {
          path: "inventory",
          element: <InventoryManagement />,
        },
        {
          path: "shipments",
          element: <ShipmentTracking />,
        },
        {
          path: "reports",
          element: <StockReports />,
        },
      ],
    },
    // New routes for procurement officer
    {
      path: "/procurement",
      element: <ProcurementLayout />,
      children: [
        {
          path: "dashboard",
          element: <ProcurementDashboard />,
        },
        {
          path: "scan/:warehouseId/:warehouseOfficer",
          element: <ProductScanPage />,
        },
        {
          path: "purchase-requests",
          element: <PurchaseRequests />,
        },
        {
          path: "vendors",
          element: <VendorManagement />,
        },
        {
          path: "orders",
          element: <PurchaseOrders />,
        },
        {
          path: "reports",
          element: <ProcurementReports />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
