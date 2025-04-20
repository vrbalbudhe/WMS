import React, { useState } from "react";
import HeadingSection from "../../components/admin/adminSections/Dashboard/HeadingSection";
import UserFilter from "../../components/admin/adminSections/ProcurementOfficer/UserFilter";
import UserListWM from "../../components/WarehouseManager/UsersListWM";

function WarehouseOfficerInfo() {
  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "all",
    userType: "all",
  });

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div>
      <HeadingSection heading={"Warehouse Manager"} />
      <UserFilter filters={filters} onFilterChange={handleFilterChange} />
      <UserListWM filters={filters} />
    </div>
  );
}

export default WarehouseOfficerInfo;
