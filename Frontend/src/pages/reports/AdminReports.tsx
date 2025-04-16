
import Layout from "@/components/layout/Layout";
import { ReportsView } from "@/components/dashboard/shared/ReportsView";

export default function AdminReports() {
  const user = {
    name: "Alex Johnson",
    role: "Administrator" as const,
    avatar: "",
  };

  return (
    <Layout role="admin" user={user}>
      <ReportsView />
    </Layout>
  );
}
