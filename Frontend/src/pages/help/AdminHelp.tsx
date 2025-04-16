
import Layout from "@/components/layout/Layout";
import { HelpFaqView } from "@/components/dashboard/shared/HelpFaqView";

export default function AdminHelp() {
  const user = {
    name: "Alex Johnson",
    role: "Administrator" as const,
    avatar: "",
  };

  return (
    <Layout role="admin" user={user}>
      <HelpFaqView />
    </Layout>
  );
}
