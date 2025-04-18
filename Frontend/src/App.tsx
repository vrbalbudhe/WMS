import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";

// Auth pages
import Login from "./pages/auth/Login";

// Dashboard pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import WarehouseDashboard from "./pages/dashboard/WarehouseDashboard";
import ProcurementDashboard from "./pages/dashboard/ProcurementDashboard";

// Reports pages
import AdminReports from "./pages/reports/AdminReports";
import WarehouseReports from "./pages/reports/WarehouseReports";
import ProcurementReports from "./pages/reports/ProcurementReports";

// Settings pages
import AdminSettings from "./pages/settings/AdminSettings";
import WarehouseSettings from "./pages/settings/WarehouseSettings";
import ProcurementSettings from "./pages/settings/ProcurementSettings";

// Help pages
import AdminHelp from "./pages/help/AdminHelp";
import WarehouseHelp from "./pages/help/WarehouseHelp";
import ProcurementHelp from "./pages/help/ProcurementHelp";

// Admin specific pages
import UserManagement from "./pages/admin/UserManagement";

// Warehouse specific pages
import Inventory from "./pages/warehouse/Inventory";
import Transfers from "./pages/warehouse/Transfers";
import SurplusItems from "./pages/warehouse/SurplusItems";

// Procurement specific pages
import ProcurementMain from "./pages/procurement/ProcurementMain";

// Other pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/warehouse" element={<WarehouseDashboard />} />
            <Route path="/dashboard/procurement" element={<ProcurementDashboard />} />
            
            {/* Reports Routes */}
            <Route path="/reports/admin" element={<AdminReports />} />
            <Route path="/reports/warehouse" element={<WarehouseReports />} />
            <Route path="/reports/procurement" element={<ProcurementReports />} />
            
            {/* Settings Routes */}
            <Route path="/settings/admin" element={<AdminSettings />} />
            <Route path="/settings/warehouse" element={<WarehouseSettings />} />
            <Route path="/settings/procurement" element={<ProcurementSettings />} />
            
            {/* Help Routes */}
            <Route path="/help/admin" element={<AdminHelp />} />
            <Route path="/help/warehouse" element={<WarehouseHelp />} />
            <Route path="/help/procurement" element={<ProcurementHelp />} />
            
            {/* Admin specific Routes */}
            <Route path="/users" element={<UserManagement />} />
            
            {/* Warehouse specific Routes */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/surplus" element={<SurplusItems />} />
            
            {/* Procurement specific Routes */}
            <Route path="/procurement" element={<ProcurementMain />} />
            
            {/* Redirect /dashboard to appropriate role dashboard based on user */}
            <Route path="/dashboard" element={<Navigate to="/auth/login" replace />} />
            <Route path="/reports" element={<Navigate to="/auth/login" replace />} />
            <Route path="/settings" element={<Navigate to="/auth/login" replace />} />
            <Route path="/help" element={<Navigate to="/auth/login" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
