import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Add missing imports
import { PublicLayout } from "./layouts/PublicLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import Homepage from "./pages/Homepage";
import React from "react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/admin/Dashboard";
import { AdminLayout } from "./layouts/AdminLayout";
import UserRegistration from "./pages/admin/UserRegistration";
import ProcurementOffInfo from "./pages/admin/ProcurementOfficerInfo";
import WarehouseOfficerInfo from "./pages/admin/WarehouseOfficerInfo";

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
          path: "create-users",
          element: <UserRegistration />,
        },
        {
          path: "procurement-officers",
          element: <ProcurementOffInfo />,
        },
        {
          path: "warehouse-officers",
          element: <WarehouseOfficerInfo />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
