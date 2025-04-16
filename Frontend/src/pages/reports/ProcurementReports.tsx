
import Layout from "@/components/layout/Layout";
import { ReportsView } from "@/components/dashboard/shared/ReportsView";

export default function ProcurementReports() {
  const user = {
    name: "Taylor Reynolds",
    role: "Procurement Officer" as const,
    avatar: "",
  };

  return (
    <Layout role="procurement" user={user}>
      <ReportsView />
    </Layout>
  );
}
