
import Layout from "@/components/layout/Layout";
import { HelpFaqView } from "@/components/dashboard/shared/HelpFaqView";

export default function WarehouseHelp() {
  const user = {
    name: "Chris Martinez",
    role: "Warehouse Manager" as const,
    avatar: "",
  };

  return (
    <Layout role="warehouse" user={user}>
      <HelpFaqView />
    </Layout>
  );
}
