
import Layout from "@/components/layout/Layout";
import { SettingsView } from "@/components/dashboard/shared/SettingsView";

export default function WarehouseSettings() {
  const user = {
    name: "Chris Martinez",
    role: "Warehouse Manager" as const,
    avatar: "",
  };

  return (
    <Layout role="warehouse" user={user}>
      <SettingsView />
    </Layout>
  );
}
