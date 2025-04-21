import React, { useState, useEffect } from 'react';
import { 
  Card,
  DatePicker,
  Button,
  Table,
  Space,
  Typography,
  Statistic,
  Row,
  Col,
  Input,
  Tag,
  Tooltip,
  Badge,
  Divider
} from 'antd';
import { 
  DownloadOutlined, 
  ReloadOutlined, 
  SearchOutlined, 
  FilterOutlined,
  CheckCircleOutlined, 
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  ShoppingOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;

const ProcurementReports = () => {
  const [dateRange, setDateRange] = useState([moment().subtract(30, 'days'), moment()]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  // Sample data for demonstration
  const sampleData = [
    { 
      key: '1',
      po_number: 'PO-2024-001',
      vendor: 'Supplier A',
      total_amount: 15000,
      items_count: 25,
      status: 'Completed',
      date: '2024-03-15',
      department: 'Electronics',
      priority: 'High'
    },
    { 
      key: '2',
      po_number: 'PO-2024-002',
      vendor: 'Supplier B',
      total_amount: 8750,
      items_count: 12,
      status: 'In Progress',
      date: '2024-03-18',
      department: 'Office Supplies',
      priority: 'Medium'
    },
    { 
      key: '3',
      po_number: 'PO-2024-003',
      vendor: 'Supplier C',
      total_amount: 23400,
      items_count: 18,
      status: 'Pending Approval',
      date: '2024-03-20',
      department: 'Furniture',
      priority: 'Low'
    },
    { 
      key: '4',
      po_number: 'PO-2024-004',
      vendor: 'Supplier A',
      total_amount: 5200,
      items_count: 7,
      status: 'Completed',
      date: '2024-03-22',
      department: 'Electronics',
      priority: 'Medium'
    },
    { 
      key: '5',
      po_number: 'PO-2024-005',
      vendor: 'Supplier D',
      total_amount: 31750,
      items_count: 30,
      status: 'Cancelled',
      date: '2024-03-25',
      department: 'IT Equipment',
      priority: 'High'
    },
    { 
      key: '6',
      po_number: 'PO-2024-006',
      vendor: 'Supplier B',
      total_amount: 12500,
      items_count: 15,
      status: 'In Progress',
      date: '2024-03-28',
      department: 'Office Supplies',
      priority: 'Medium'
    },
    { 
      key: '7',
      po_number: 'PO-2024-007',
      vendor: 'Supplier E',
      total_amount: 18300,
      items_count: 22,
      status: 'Completed',
      date: '2024-04-01',
      department: 'Marketing',
      priority: 'High'
    },
    { 
      key: '8',
      po_number: 'PO-2024-008',
      vendor: 'Supplier C',
      total_amount: 9600,
      items_count: 10,
      status: 'Pending Approval',
      date: '2024-04-05',
      department: 'Furniture',
      priority: 'Low'
    }
  ];

  // Status tag renderer
  const renderStatusTag = (status) => {
    const statusConfig = {
      'Completed': { color: 'success', icon: <CheckCircleOutlined /> },
      'In Progress': { color: 'processing', icon: <ClockCircleOutlined /> },
      'Pending Approval': { color: 'warning', icon: <ExclamationCircleOutlined /> },
      'Cancelled': { color: 'error', icon: <CloseCircleOutlined /> }
    };
    
    const config = statusConfig[status] || { color: 'default', icon: null };
    
    return (
      <Tag color={config.color} icon={config.icon}>
        {status}
      </Tag>
    );
  };

  // Priority tag renderer
  const renderPriorityTag = (priority) => {
    const colorMap = { 'High': 'red', 'Medium': 'orange', 'Low': 'green' };
    return <Tag color={colorMap[priority]}>{priority}</Tag>;
  };

  // Table columns with enhanced styling
  const columns = [
    { 
      title: 'PO Number', 
      dataIndex: 'po_number', 
      key: 'po_number',
      sorter: (a, b) => a.po_number.localeCompare(b.po_number),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.po_number.toLowerCase().includes(value.toLowerCase()) ||
        record.vendor.toLowerCase().includes(value.toLowerCase()),
      render: (text) => <span className="font-medium text-blue-600">{text}</span>
    },
    { 
      title: 'Vendor', 
      dataIndex: 'vendor', 
      key: 'vendor',
      sorter: (a, b) => a.vendor.localeCompare(b.vendor),
      filters: Array.from(new Set(sampleData.map(item => item.vendor))).map(vendor => ({ text: vendor, value: vendor })),
      onFilter: (value, record) => record.vendor === value
    },
    { 
      title: 'Department', 
      dataIndex: 'department', 
      key: 'department',
      filters: Array.from(new Set(sampleData.map(item => item.department))).map(dept => ({ text: dept, value: dept })),
      onFilter: (value, record) => record.department === value
    },
    { 
      title: 'Total Amount', 
      dataIndex: 'total_amount', 
      key: 'total_amount',
      sorter: (a, b) => a.total_amount - b.total_amount,
      render: (value) => (
        <Tooltip title={`₹${value.toLocaleString()}`}>
          <span className="font-medium">
            {/* <DollarOutlined className="mr-1 text-green-600" /> */}
            ₹{value.toLocaleString()}
          </span>
        </Tooltip>
      )
    },
    { 
      title: 'Items', 
      dataIndex: 'items_count', 
      key: 'items_count',
      sorter: (a, b) => a.items_count - b.items_count,
      render: (value) => (
        <Badge count={value} showZero color="#108ee9" overflowCount={999}>
          <span className="mr-2"><ShoppingOutlined /></span>
        </Badge>
      )
    },
    { 
      title: 'Priority', 
      dataIndex: 'priority', 
      key: 'priority',
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' }
      ],
      onFilter: (value, record) => record.priority === value,
      render: renderPriorityTag
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Pending Approval', value: 'Pending Approval' },
        { text: 'Cancelled', value: 'Cancelled' }
      ],
      onFilter: (value, record) => record.status === value,
      render: renderStatusTag
    },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date',
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text) => (
        <span>
          <CalendarOutlined className="mr-1 text-gray-500" />
          {moment(text).format('MMM DD, YYYY')}
        </span>
      )
    }
  ];

  useEffect(() => {
    // Load data on component mount
    handleGenerateReport();
  }, []);

  // Filter data based on search text
  const getFilteredData = () => {
    if (searchText === '') return data;
    
    return data.filter(item => 
      item.po_number.toLowerCase().includes(searchText.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchText.toLowerCase()) ||
      item.department.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleGenerateReport = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  };

  const handleExportReport = () => {
    // Implement export functionality
    console.log('Exporting report...');
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Calculate summary statistics
  const calculateStats = () => {
    const filteredData = getFilteredData();
    
    const totalOrders = filteredData.length;
    const totalSpend = filteredData.reduce((sum, order) => sum + order.total_amount, 0);
    const avgOrderValue = totalSpend / totalOrders || 0;
    const pendingOrders = filteredData.filter(order => 
      order.status === 'Pending Approval' || order.status === 'In Progress'
    ).length;
    
    return { totalOrders, totalSpend, avgOrderValue, pendingOrders };
  };

  const stats = calculateStats();

  const renderSummaryStats = () => (
    <Row gutter={16} className="mb-6">
      <Col span={6}>
        <Card className="hover:shadow-md transition-shadow duration-300" bordered={false}>
          <Statistic
            title={<Text strong>Total Purchase Orders</Text>}
            value={stats.totalOrders}
            precision={0}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card className="hover:shadow-md transition-shadow duration-300" bordered={false}>
          <Statistic
            title={<Text strong>Total Spend</Text>}
            value={stats.totalSpend}
            precision={2}
            prefix="₹"
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card className="hover:shadow-md transition-shadow duration-300" bordered={false}>
          <Statistic
            title={<Text strong>Average Order Value</Text>}
            value={stats.avgOrderValue}
            precision={2}
            prefix="₹"
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card className="hover:shadow-md transition-shadow duration-300" bordered={false}>
          <Statistic
            title={<Text strong>Pending Orders</Text>}
            value={stats.pendingOrders}
            precision={0}
            valueStyle={{ color: stats.pendingOrders > 10 ? '#faad14' : '#52c41a' }}
          />
        </Card>
      </Col>
    </Row>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Card 
          className="shadow-sm rounded-lg overflow-hidden mb-6"
          title={
            <div className="flex items-center">
              <Title level={2} style={{ margin: 0 }}>Purchase Orders Summary</Title>
            </div>
          }
          extra={
            <Space size="small">
              <Button 
                onClick={handleExportReport}
                icon={<DownloadOutlined />}
              >
                Export
              </Button>
            </Space>
          }
        >
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <Text>
              This report shows a summary of all purchase orders. Use the filters and search to narrow down results.
            </Text>
          </div>
          
          <div className="flex flex-wrap justify-between items-center mb-6">
            <Space size="large" wrap>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-64"
                allowClear={false}
              />
              <Button 
                type="primary"
                onClick={handleGenerateReport}
                loading={loading}
                icon={<ReloadOutlined />}
              >
                Generate Report
              </Button>
            </Space>
            
            <Search
              placeholder="Search by PO Number, Vendor, or Department"
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
          </div>

          {renderSummaryStats()}

          <Divider style={{ margin: '12px 0 24px' }}>
            <FilterOutlined /> Detailed Purchase Orders
          </Divider>

          <Table
            columns={columns}
            dataSource={getFilteredData()}
            loading={loading}
            rowKey="key"
            scroll={{ x: 'max-content' }}
            pagination={{ 
              pageSize: 5, 
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              showQuickJumper: true
            }}
            rowClassName={(record) => {
              if (record.status === 'Cancelled') return 'bg-red-50';
              if (record.status === 'Completed') return 'bg-green-50';
              return '';
            }}
            summary={pageData => {
              // Calculate totals for current page
              const totalAmount = pageData.reduce((sum, order) => sum + order.total_amount, 0);
              const totalItems = pageData.reduce((sum, order) => sum + order.items_count, 0);
              
              return (
                <Table.Summary.Row className="bg-gray-100 font-medium">
                  <Table.Summary.Cell index={0} colSpan={3}>Page Total:</Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>₹{totalAmount.toLocaleString()}</Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>{totalItems}</Table.Summary.Cell>
                  <Table.Summary.Cell index={5} colSpan={3}></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default ProcurementReports;