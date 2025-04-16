
import Layout from "@/components/layout/Layout";
import { SettingsView } from "@/components/dashboard/shared/SettingsView";

export default function ProcurementSettings() {
  const user = {
    name: "Taylor Reynolds",
    role: "Procurement Officer" as const,
    avatar: "",
  };

  return (
    <Layout role="procurement" user={user}>
      <SettingsView />
    </Layout>
  );
}
