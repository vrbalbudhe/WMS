
import Layout from "@/components/layout/Layout";
import { UserManagementView } from "@/components/dashboard/admin/UserManagementView";

export default function UserManagement() {
  const user = {
    name: "Alex Johnson",
    role: "Administrator" as const,
    avatar: "",
  };

  return (
    <Layout role="admin" user={user}>
      <UserManagementView />
    </Layout>
  );
}
