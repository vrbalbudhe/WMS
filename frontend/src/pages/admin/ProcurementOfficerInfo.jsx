import React from "react";
import HeadingSection from "../../components/admin/adminSections/Dashboard/HeadingSection";
import UserFilter from "../../components/admin/adminSections/ProcurementOfficer/UserFilter";
import UserList from "../../components/admin/adminSections/ProcurementOfficer/UserList";

function ProcurementOffInfo() {
  return (
    <div>
      <HeadingSection heading={"Procurement Officers"} />
      <UserFilter />
      <UserList />
    </div>
  );
}

export default ProcurementOffInfo;
