
import Layout from "@/components/layout/Layout";
import { SettingsView } from "@/components/dashboard/shared/SettingsView";

export default function AdminSettings() {
  const user = {
    name: "Alex Johnson",
    role: "Administrator" as const,
    avatar: "",
  };

  return (
    <Layout role="admin" user={user}>
      <SettingsView />
    </Layout>
  );
}
