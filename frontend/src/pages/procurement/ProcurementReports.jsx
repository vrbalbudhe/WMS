import React, { useState } from 'react';
import { 
  Card,
  Select,
  DatePicker,
  Button,
  Table,
  Space,
  Typography,
  Statistic,
  Row,
  Col
} from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ProcurementReports = () => {
  const [reportType, setReportType] = useState('purchase_orders');
  const [dateRange, setDateRange] = useState(null);
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { value: 'purchase_orders', label: 'Purchase Orders Summary' },
    { value: 'vendor_performance', label: 'Vendor Performance Analysis' },
    { value: 'spending_analysis', label: 'Spending Analysis' },
    { value: 'order_status', label: 'Order Status Distribution' },
  ];

  // Sample data - Replace with actual API calls
  const reportData = {
    purchase_orders: [
      { 
        key: '1',
        po_number: 'PO-2024-001',
        vendor: 'Supplier A',
        total_amount: 15000,
        items_count: 25,
        status: 'Completed',
        date: '2024-03-15'
      },
      // Add more sample data
    ]
  };

  const columns = {
    purchase_orders: [
      { title: 'PO Number', dataIndex: 'po_number', key: 'po_number' },
      { title: 'Vendor', dataIndex: 'vendor', key: 'vendor' },
      { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount',
        render: (value) => `$${value.toLocaleString()}` },
      { title: 'Items Count', dataIndex: 'items_count', key: 'items_count' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Date', dataIndex: 'date', key: 'date' }
    ]
  };

  const handleGenerateReport = () => {
    setLoading(true);
    // Implement API call to fetch report data based on type and date range
    setTimeout(() => setLoading(false), 1000); // Simulated API call
  };

  const handleExportReport = () => {
    // Implement export functionality (CSV/PDF)
  };

  const renderSummaryStats = () => (
    <Row gutter={16} className="mb-6">
      <Col span={6}>
        <Card>
          <Statistic
            title="Total Orders"
            value={156}
            precision={0}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Total Spend"
            value={234567}
            precision={2}
            prefix="$"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Average Order Value"
            value={1503.67}
            precision={2}
            prefix="$"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Pending Orders"
            value={23}
            precision={0}
          />
        </Card>
      </Col>
    </Row>
  );

  return (
    <div className="p-6">
      <Title level={2}>Procurement Reports</Title>
      
      <Card className="mb-6">
        <Space size="large" className="mb-4">
          <Select
            style={{ width: 250 }}
            placeholder="Select Report Type"
            options={reportTypes}
            value={reportType}
            onChange={setReportType}
          />
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            className="w-64"
          />
          <Button 
            type="primary"
            onClick={handleGenerateReport}
            loading={loading}
            icon={<ReloadOutlined />}
          >
            Generate Report
          </Button>
          <Button 
            onClick={handleExportReport}
            icon={<DownloadOutlined />}
          >
            Export
          </Button>
        </Space>

        {renderSummaryStats()}

        <Table
          columns={columns[reportType]}
          dataSource={reportData[reportType]}
          loading={loading}
          scroll={{ x: true }}
          className="mt-4"
        />
      </Card>
    </div>
  );
};

export default ProcurementReports;
