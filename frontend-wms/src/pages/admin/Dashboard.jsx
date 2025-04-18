import React from "react";
import HeadingSection from "../../components/admin/adminSections/Dashboard/HeadingSection";
import InventoryOverviewCard from "../../components/admin/adminSections/Dashboard/InteractiveOverviewCard";
import ReceivingQueueDashboard from "../../components/admin/adminSections/Dashboard/ReceivingQueueDash";

function Dashboard() {
  return (
    <div>
      <HeadingSection heading={"Admin Dashboard"} />
      <InventoryOverviewCard />
      <ReceivingQueueDashboard />
    </div>
  );
}

export default Dashboard;
