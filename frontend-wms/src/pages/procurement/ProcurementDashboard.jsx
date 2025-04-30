import React, { useState } from 'react';
import { 
  FaFileAlt, 
  FaUsers, 
  FaDollarSign, 
  FaClock, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaChevronRight,
  FaShoppingCart,
  FaChartLine,
  FaChartBar,
  FaPlus,
  FaFilter
} from 'react-icons/fa';

// Import components
import SummaryCard from '../../components/procurement/dashboard/SummaryCard';
import RecentPurchaseRequests from '../../components/procurement/dashboard/RecentPurchaseRequests';
import TopVendors from '../../components/procurement/dashboard/TopVendors';
import SpendingByCategory from '../../components/procurement/dashboard/SpendingByCategory';
import QuickActionButton from '../../components/procurement/dashboard/QuickActionButton';

const ProcurementDashboard = () => {
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('month');
  
  // Mock data for summary cards
  const summaryData = {
    totalRequests: 42,
    pendingApproval: 12,
    inProgress: 8,
    completed: 22,
    totalSpend: 128500,
    pendingPayments: 45200,
    activeVendors: 14,
    savingsMonth: 12500,
    savingsYTD: 65000
  };
  
  // Mock data for recent purchase requests
  const recentPurchaseRequests = [
    { id: 'PR-2089', date: '2025-04-17', requestedBy: 'John Smith', department: 'IT', items: 4, amount: 1250.00, status: 'Pending Approval' },
    { id: 'PR-2088', date: '2025-04-16', requestedBy: 'Sarah Johnson', department: 'Marketing', items: 2, amount: 3400.00, status: 'Approved' },
    { id: 'PR-2087', date: '2025-04-15', requestedBy: 'Michael Brown', department: 'Operations', items: 5, amount: 950.00, status: 'Processing' },
    { id: 'PR-2086', date: '2025-04-14', requestedBy: 'Lisa Chen', department: 'Finance', items: 3, amount: 2100.00, status: 'Completed' },
    { id: 'PR-2085', date: '2025-04-13', requestedBy: 'David Wilson', department: 'IT', items: 1, amount: 750.00, status: 'Rejected' }
  ];
  
  // Mock data for top vendors
  const topVendors = [
    { name: 'Tech Supplies Inc.', spending: 42500, reliability: 98, onTimeDelivery: 96 },
    { name: 'Office Essentials', spending: 28750, reliability: 95, onTimeDelivery: 94 },
    { name: 'Global Hardware', spending: 22300, reliability: 92, onTimeDelivery: 90 },
    { name: 'Quality Products', spending: 18500, reliability: 97, onTimeDelivery: 98 }
  ];
  
  // Mock data for category spending
  const categorySpending = [
    { name: 'IT Equipment', amount: 56000, percentage: 43.6 },
    { name: 'Office Supplies', amount: 32500, percentage: 25.3 },
    { name: 'Furniture', amount: 22000, percentage: 17.1 },
    { name: 'Services', amount: 18000, percentage: 14.0 }
  ];
  
  // Function to change time period
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    // In a real app, this would trigger API calls to refresh data
  };

  // Quick actions data
  const quickActions = [
    { 
      icon: <FaFileAlt size={20} />, 
      label: 'New Request', 
      bgColor: 'bg-blue-100', 
      textColor: 'text-blue-600',
      onClick: () => console.log('New Request clicked')
    },
    { 
      icon: <FaUsers size={20} />, 
      label: 'Manage Vendors', 
      bgColor: 'bg-blue-100', 
      textColor: 'text-blue-600',
      onClick: () => console.log('Manage Vendors clicked')
    },
    { 
      icon: <FaChartLine size={20} />, 
      label: 'View Reports', 
      bgColor: 'bg-purple-100', 
      textColor: 'text-purple-600',
      onClick: () => console.log('View Reports clicked')
    },
    { 
      icon: <FaExclamationTriangle size={20} />, 
      label: 'Pending Approvals', 
      bgColor: 'bg-yellow-100', 
      textColor: 'text-yellow-600',
      onClick: () => console.log('Pending Approvals clicked')
    }
  ];
  
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Procurement Dashboard</h1>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Time Period Filter */}
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  timePeriod === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
                onClick={() => handleTimePeriodChange('week')}
              >
                Week
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  timePeriod === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
                onClick={() => handleTimePeriodChange('month')}
              >
                Month
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  timePeriod === 'year' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
                onClick={() => handleTimePeriodChange('year')}
              >
                Year
              </button>
            </div>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaFilter className="mr-2 text-gray-500" /> Filters
            </button>
            
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <FaPlus className="mr-2" /> New Request
            </button>
          </div>
        </div>
        
        {/* Summary Cards Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="Total Requests"
            value={summaryData.totalRequests}
            icon={<FaFileAlt size={24} />}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
            trend="+8%"
          />
          
          <SummaryCard 
            title="Pending Approval"
            value={summaryData.pendingApproval}
            icon={<FaClock size={24} />}
            bgColor="bg-yellow-100"
            textColor="text-yellow-600"
          />
          
          <SummaryCard 
            title="In Progress"
            value={summaryData.inProgress}
            icon={<FaShoppingCart size={24} />}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          
          <SummaryCard 
            title="Completed"
            value={summaryData.completed}
            icon={<FaCheckCircle size={24} />}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
            trend="+12%"
          />
        </div>
        
        {/* Summary Cards Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <SummaryCard 
            title={`Total Spend (${timePeriod})`}
            value={summaryData.totalSpend}
            icon={<FaDollarSign size={24} />}
            bgColor="bg-indigo-100"
            textColor="text-indigo-600"
            isCurrency={true}
          />
          
          <SummaryCard 
            title="Active Vendors"
            value={summaryData.activeVendors}
            icon={<FaUsers size={24} />}
            bgColor="bg-purple-100"
            textColor="text-purple-600"
          />
          
          <SummaryCard 
            title={`Savings (${timePeriod})`}
            value={timePeriod === 'year' ? summaryData.savingsYTD : summaryData.savingsMonth}
            icon={<FaDollarSign size={24} />}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
            isCurrency={true}
            trend="+5%"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Purchase Requests */}
          <RecentPurchaseRequests requests={recentPurchaseRequests} />
          
          {/* Top Vendors */}
          <TopVendors vendors={topVendors} />
        </div>
        
        {/* Spending Breakdown */}
        <SpendingByCategory 
          categories={categorySpending} 
          totalSpend={summaryData.totalSpend} 
          timePeriod={timePeriod} 
        />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              icon={action.icon}
              label={action.label}
              bgColor={action.bgColor}
              textColor={action.textColor}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcurementDashboard;