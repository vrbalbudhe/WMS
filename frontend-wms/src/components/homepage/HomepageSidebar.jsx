import React from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3,
  Box,
  Truck,
  ClipboardCheck,
  ArrowRight,
  Shield,
  RefreshCw,
  Building2,
  LineChart
} from "lucide-react";

const WarehouseLandingPage = () => {
  return (
    <div className="max-w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Optimize Your Warehouse Operations
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Get complete control over inventory, procurement, and distribution with our powerful Warehouse Management System.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/dashboard" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Request Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-2 rounded-lg shadow-xl">
                <img 
                  src="https://imgs.search.brave.com/t55aR4FzfP_MCf1prHe7JU9T1fUB5caoxyPpVbp5NZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/OTY5NTk0MS9waG90/by9zbWFydC13YXJl/aG91c2UtbWFuYWdl/bWVudC1zeXN0ZW0u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTBDYS0xRUNwQ0Zx/REZUbjdWSVR5dzJN/a1pIRFNndnJwSEJR/Njh0R1ZNTjA9" 
                  alt="Warehouse Dashboard Preview" 
                  className="rounded w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution helps you manage inventory effectively and make data-driven decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Box className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-Time Inventory Tracking</h3>
              <p className="text-gray-600">
                Maintain complete visibility over your inventory with QR code scanning and real-time updates for precise stock management.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Consumption Planning</h3>
              <p className="text-gray-600">
                Plan material usage effectively with forecasting tools that work even without historical consumption data.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <ClipboardCheck className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Procurement Control</h3>
              <p className="text-gray-600">
                Prevent overstocking with threshold-based alerts and approval workflows that align orders with actual inventory needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inter-Warehouse Transfer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://imgs.search.brave.com/dI_UQOY0jhC68VGDr4W7ttwPilulDWTxnCEfjS7HoOQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/NDA0MzY4Ni9waG90/by9idXNpbmVzcy1t/YW5hZ2VyLXRhbGtp/bmctdG8tYS1ncm91/cC1vZi1lbXBsb3ll/ZXMtYXQtYS1kaXN0/cmlidXRpb24td2Fy/ZWhvdXNlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1pLXNY/bmdLQVNycFBmb09B/MC1OZGViZkNIYkZs/TFpfT3NEeXlRc3B2/Tld3PQ" 
                alt="Inter-Warehouse Transfer" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Inter-Warehouse Transfers & Surplus Sales</h2>
              <p className="text-lg text-gray-600 mb-6">
                Efficiently redistribute materials between warehouse locations and sell surplus products to external buyers through our integrated marketplace.
              </p>
              <ul className="space-y-4">
                {[
                  "Transfer excess materials between warehouses",
                  "List surplus products for external sales",
                  "Automatic inventory updates after transfers or sales",
                  "Manager approval workflow for transfer requests",
                  "Real-time notifications for transaction status"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Reporting & Analytics</h2>
              <p className="text-lg text-gray-600 mb-6">
                Make data-driven decisions with our powerful analytics dashboard that provides real-time insights into your inventory, consumption, and procurement metrics.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time inventory and consumption reports",
                  "Visual analytics through charts and graphs",
                  "Exportable reports in multiple formats",
                  "Customizable dashboard views",
                  "Historical data for trend analysis"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
              <img 
                src="https://imgs.search.brave.com/nEFtuWIrMBm06oB34N9HGeKvWP2JjqKMnWWo3tVTDPo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEzLzEwLzAwLzQ1/LzM2MF9GXzEzMTAw/MDQ1ODFfa3lJdlFR/WGdiN2lyekRvMndF/ZUFRVWprY1NUU2p1/VUYuanBn" 
                alt="Analytics Dashboard" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Designed for Your Entire Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored interfaces for each role in your warehouse operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Administrators</h3>
              <p className="text-gray-600 text-center">
                Centralized dashboard for system configuration, user management, and monitoring key performance indicators.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Building2 className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Warehouse Managers</h3>
              <p className="text-gray-600 text-center">
                Real-time inventory views, QR code scanning for rapid stock updates, and manual data entry forms for consumption tracking.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <LineChart className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Procurement Officers</h3>
              <p className="text-gray-600 text-center">
                Inventory level monitoring, consumption reports, and alerts for procurement decisions with approval workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our system leverages the best of modern web and cloud technologies to ensure scalability, performance, and ease of use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">React.js</h4>
              <p className="text-gray-600">
                Fast, component-based UI development for responsive and dynamic user experiences.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Node.js & Express</h4>
              <p className="text-gray-600">
                Backend services with RESTful APIs for smooth integration and performance.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">MongoDB</h4>
              <p className="text-gray-600">
                Flexible NoSQL database for storing inventory, users, and transaction data.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">AWS & Cloud Services</h4>
              <p className="text-gray-600">
                Scalable deployment, secure data storage, and real-time services through AWS.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Tailwind CSS</h4>
              <p className="text-gray-600">
                Utility-first CSS framework for fast, responsive, and maintainable designs.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Lucide Icons</h4>
              <p className="text-gray-600">
                Clean and modern iconography for intuitive navigation and interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="bg-gray-100 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} WarehousePro. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default WarehouseLandingPage;
