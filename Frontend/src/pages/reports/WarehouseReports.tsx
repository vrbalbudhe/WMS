
import Layout from "@/components/layout/Layout";
import { ReportsView } from "@/components/dashboard/shared/ReportsView";

export default function WarehouseReports() {
  const user = {
    name: "Chris Martinez",
    role: "Warehouse Manager" as const,
    avatar: "",
  };

  return (
    <Layout role="warehouse" user={user}>
      <ReportsView />
    </Layout>
  );
}
