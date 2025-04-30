import React, { useState } from 'react';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaDownload, 
  FaCalendarAlt, 
  FaFilter, 
  FaFileExport,
  FaExclamationTriangle,
  FaBoxOpen,
  FaBox
} from 'react-icons/fa';
import StockSummaryCard from '../../components/warehouse/reports/StockSummaryCard';
import StockLevelChart from '../../components/warehouse/reports/StockLevelChart';
import CategoryDistributionChart from '../../components/warehouse/reports/CategoryDistributionChart';
import StockTrendChart from '../../components/warehouse/reports/StockTrendChart';
import LowStockTable from '../../components/warehouse/reports/LowStockTable';
import StockReportFilters from '../../components/warehouse/reports/StockReportFilters';

const StockReports = () => {
  // State for date range filter
  const [dateRange, setDateRange] = useState({
    startDate: '2025-01-01',
    endDate: '2025-04-18',
  });
  
  // State for displaying filters
  const [showFilters, setShowFilters] = useState(false);
  
  // State for active category filter
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Sample data for stock summary
  const stockSummary = {
    totalItems: 1426,
    totalValue: 2564,
    uniqueProducts: 87,
    categories: 12,
    lowStockItems: 14,
    outOfStockItems: 5
  };
  
  // Sample data for category distribution
  const categoryDistribution = [
    { name: 'Office Supplies', value: 450, percentage: 31.6 },
    { name: 'Electronics', value: 325, percentage: 22.8 },
    { name: 'Furniture', value: 280, percentage: 19.6 },
    { name: 'Safety Equipment', value: 201, percentage: 14.1 },
    { name: 'Others', value: 170, percentage: 11.9 }
  ];
  
  // Sample data for stock level trend over time
  const stockTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        name: 'Total Stock Level',
        data: [1250, 1320, 1380, 1426]
      },
      {
        name: 'Items Added',
        data: [120, 95, 110, 88]
      },
      {
        name: 'Items Removed',
        data: [80, 45, 50, 42]
      }
    ]
  };
  
  // Sample data for items at low stock levels
  const lowStockItems = [
    { 
      id: 'ITM-1867', 
      name: 'Printer Toner - Black', 
      category: 'Office Supplies',
      quantity: 3,
      minRequired: 15,
      supplier: 'Tech Supplies Inc.',
      lastUpdated: '2025-04-12',
      status: 'Low Stock'
    },
    { 
      id: 'ITM-2103', 
      name: 'First Aid Kit', 
      category: 'Safety',
      quantity: 1,
      minRequired: 8,
      supplier: 'Safety First Ltd.',
      lastUpdated: '2025-04-08',
      status: 'Low Stock'
    },
    { 
      id: 'ITM-1756', 
      name: 'Paper - A4', 
      category: 'Office Supplies',
      quantity: 0,
      minRequired: 20,
      supplier: 'Paper Supplies Co.',
      lastUpdated: '2025-04-11',
      status: 'Out of Stock'
    },
    { 
      id: 'ITM-1921', 
      name: 'Whiteboard Markers', 
      category: 'Office Supplies',
      quantity: 4,
      minRequired: 12,
      supplier: 'Office Supplies Inc.',
      lastUpdated: '2025-04-14',
      status: 'Low Stock'
    },
    { 
      id: 'ITM-2045', 
      name: 'Laptop Charger - Universal', 
      category: 'Electronics',
      quantity: 2,
      minRequired: 10,
      supplier: 'Tech Supplies Inc.',
      lastUpdated: '2025-04-10',
      status: 'Low Stock'
    }
  ];
  
  // Handle date range change
  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    // In a real app, this would trigger API calls to refresh data
  };
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    // In a real app, this would filter the data displayed
  };
  
  // Handle export report
  const handleExportReport = (reportType) => {
    // In a real app, this would generate and download a report
    alert(`Exporting ${reportType} report...`);
  };
  
  // Get all unique categories from the data
  const categories = ['All', ...new Set(categoryDistribution.map(item => item.name))];
  
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        {/* Header with title and actions */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Stock Reports</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
            <button 
              onClick={() => handleExportReport('Stock Summary')}
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            >
              <FaFileExport className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
        
        {/* Filters panel */}
        {showFilters && (
          <StockReportFilters 
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            categoryFilter={categoryFilter}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onClose={() => setShowFilters(false)}
          />
        )}
        
        {/* Stock Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StockSummaryCard 
            title="Total Items"
            value={stockSummary.totalItems}
            icon={<FaBox />}
            color="bg-blue-100 text-blue-800"
          />
          <StockSummaryCard 
            title="Total Value"
            value={`₹${stockSummary.totalValue.toLocaleString()}`}
            icon={<FaChartLine />}
            color="bg-green-100 text-green-800"
          />
          <StockSummaryCard 
            title="Products"
            value={stockSummary.uniqueProducts}
            icon={<FaBoxOpen />}
            color="bg-blue-100 text-blue-800"
          />
          <StockSummaryCard 
            title="Categories"
            value={stockSummary.categories}
            icon={<FaChartPie />}
            color="bg-indigo-100 text-indigo-800"
          />
          <StockSummaryCard 
            title="Low Stock"
            value={stockSummary.lowStockItems}
            icon={<FaExclamationTriangle />}
            color="bg-yellow-100 text-yellow-800"
          />
          <StockSummaryCard 
            title="Out of Stock"
            value={stockSummary.outOfStockItems}
            icon={<FaExclamationTriangle />}
            color="bg-red-100 text-red-800"
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Level Trend Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                <FaChartLine className="mr-2 text-blue-600" />
                Stock Level Trends
              </h2>
              <button
                onClick={() => handleExportReport('Stock Trends')}
                className="text-sm text-blue-600 hover:underline"
              >
                <FaDownload className="inline mr-1" /> Export
              </button>
            </div>
            <div className="p-4">
              <StockTrendChart data={stockTrendData} />
            </div>
          </div>
          
          {/* Category Distribution Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                <FaChartPie className="mr-2 text-blue-600" />
                Category Distribution
              </h2>
              <button
                onClick={() => handleExportReport('Category Distribution')}
                className="text-sm text-blue-600 hover:underline"
              >
                <FaDownload className="inline mr-1" /> Export
              </button>
            </div>
            <div className="p-4">
              <CategoryDistributionChart data={categoryDistribution} />
            </div>
          </div>
        </div>
        
        {/* Stock Level By Category */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaChartBar className="mr-2 text-blue-600" />
              Stock Levels by Category
            </h2>
            <button
              onClick={() => handleExportReport('Stock Levels by Category')}
              className="text-sm text-blue-600 hover:underline"
            >
              <FaDownload className="inline mr-1" /> Export
            </button>
          </div>
          <div className="p-4">
            <StockLevelChart data={categoryDistribution} />
          </div>
        </div>
        
        {/* Low Stock Items Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaExclamationTriangle className="mr-2 text-yellow-500" />
              Items Requiring Attention
            </h2>
            <button
              onClick={() => handleExportReport('Low Stock Items')}
              className="text-sm text-blue-600 hover:underline"
            >
              <FaDownload className="inline mr-1" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <LowStockTable items={lowStockItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockReports;