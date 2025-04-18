
import Layout from "@/components/layout/Layout";
import { HelpFaqView } from "@/components/dashboard/shared/HelpFaqView";

export default function ProcurementHelp() {
  const user = {
    name: "Taylor Reynolds",
    role: "Procurement Officer" as const,
    avatar: "",
  };

  return (
    <Layout role="procurement" user={user}>
      <HelpFaqView />
    </Layout>
  );
}
