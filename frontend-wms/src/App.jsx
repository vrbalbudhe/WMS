import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Add missing imports
import { PublicLayout } from "./layouts/PublicLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import Homepage from "./pages/Homepage";
import React from "react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/admin/Dashboard";

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
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          path: "/user/:id",
          element: <ProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
