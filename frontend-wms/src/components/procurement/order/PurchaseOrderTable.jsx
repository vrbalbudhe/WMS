import React from 'react';
import { 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes,
  FaBan,
  FaReceipt,
  FaTruck,
  FaFileInvoiceDollar
} from 'react-icons/fa';

const PurchaseOrderTable = ({ 
  orders, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onEdit, 
  onApprove, 
  onReject, 
  onCancel,
  onUpdateStatus,
  onDelete 
}) => {
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="text-green-600" /> : <FaSortDown className="text-green-600" />;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Ordered':
        return 'bg-indigo-100 text-indigo-800';
      case 'Partially Received':
        return 'bg-purple-100 text-purple-800';
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'Invoiced':
        return 'bg-orange-100 text-orange-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get available actions based on order status
  const getStatusActions = (order) => {
    const actions = [];
    
    switch (order.status) {
      case 'Pending Approval':
        actions.push({
          icon: <FaCheck size={16} className="text-green-600" />,
          title: 'Approve Order',
          onClick: () => onApprove(order.id)
        });
        actions.push({
          icon: <FaTimes size={16} className="text-red-600" />,
          title: 'Reject Order',
          onClick: () => onReject(order.id)
        });
        break;
      case 'Approved':
        actions.push({
          icon: <FaTruck size={16} className="text-blue-600" />,
          title: 'Mark as Ordered',
          onClick: () => onUpdateStatus(order.id, 'Ordered')
        });
        actions.push({
          icon: <FaBan size={16} className="text-red-600" />,
          title: 'Cancel Order',
          onClick: () => onCancel(order.id)
        });
        break;
      case 'Ordered':
        actions.push({
          icon: <FaReceipt size={16} className="text-purple-600" />,
          title: 'Mark as Partially Received',
          onClick: () => onUpdateStatus(order.id, 'Partially Received')
        });
        actions.push({
          icon: <FaCheck size={16} className="text-green-600" />,
          title: 'Mark as Received',
          onClick: () => onUpdateStatus(order.id, 'Received')
        });
        break;
      case 'Partially Received':
        actions.push({
          icon: <FaCheck size={16} className="text-green-600" />,
          title: 'Mark as Fully Received',
          onClick: () => onUpdateStatus(order.id, 'Received')
        });
        break;
      case 'Received':
        actions.push({
          icon: <FaFileInvoiceDollar size={16} className="text-orange-600" />,
          title: 'Mark as Invoiced',
          onClick: () => onUpdateStatus(order.id, 'Invoiced')
        });
        break;
      case 'Invoiced':
        actions.push({
          icon: <FaCheck size={16} className="text-green-600" />,
          title: 'Mark as Paid',
          onClick: () => onUpdateStatus(order.id, 'Paid')
        });
        break;
      default:
        break;
    }
    
    return actions;
  };

  // Card view for mobile screens
  const renderMobileCards = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-blue-600">{order.id}</div>
                <div className="text-xs text-gray-500">{formatDate(order.date)}</div>
              </div>
              <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="text-sm font-medium text-gray-900">{order.vendorName}</div>
              <div className="text-xs text-gray-500">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'} | 
                Total: {formatCurrency(order.totalAmount)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 mb-3 text-xs">
              <div>
                <span className="text-gray-500">Request ID:</span>
                <div>{order.requestId}</div>
                </div>
              <div>
                <span className="text-gray-500">Created By:</span>
                <div>{order.createdBy}</div>
              </div>
              <div>
                <span className="text-gray-500">Department:</span>
                <div>{order.department}</div>
              </div>
              <div>
                <span className="text-gray-500">Delivery Date:</span>
                <div>{formatDate(order.deliveryDate)}</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => onView(order)} 
                title="View"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEye size={16} />
              </button>
              <button 
                onClick={() => onEdit(order)} 
                title="Edit"
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaEdit size={16} />
              </button>
              {getStatusActions(order).map((action, idx) => (
                <button 
                  key={idx}
                  onClick={action.onClick}
                  title={action.title}
                  className="hover:opacity-80"
                >
                  {action.icon}
                </button>
              ))}
              <button 
                onClick={() => onDelete(order.id)} 
                title="Delete"
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTableView = () => (
    <table className="min-w-full divide-y divide-gray-200 hidden md:table">
      <thead className="bg-gray-50">
        <tr>
          {[
            { label: "Order ID", field: "id" },
            { label: "Vendor", field: "vendorName" },
            { label: "Date", field: "date" },
            { label: "Total Amount", field: "totalAmount" },
            { label: "Status", field: "status" },
            { label: "Department", field: "department" },
            { label: "Actions", field: null }
          ].map((col, i) => (
            <th
              key={i}
              scope="col"
              className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.field ? 'cursor-pointer' : ''}`}
              onClick={col.field ? () => onSort(col.field) : undefined}
            >
              <div className="flex items-center">
                {col.label} {col.field ? getSortIcon(col.field) : null}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="px-3 py-2 text-sm text-blue-600">{order.id}</td>
            <td className="px-3 py-2 text-sm text-gray-900">{order.vendorName}</td>
            <td className="px-3 py-2 text-sm text-gray-500">{formatDate(order.date)}</td>
            <td className="px-3 py-2 text-sm text-gray-500">{formatCurrency(order.totalAmount)}</td>
            <td className="px-3 py-2">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </td>
            <td className="px-3 py-2 text-sm text-gray-500">{order.department}</td>
            <td className="px-3 py-2 text-sm text-right">
              <div className="flex justify-end items-center space-x-2">
                <button 
                  onClick={() => onView(order)} 
                  title="View"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye size={16} />
                </button>
                <button 
                  onClick={() => onEdit(order)} 
                  title="Edit"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaEdit size={16} />
                </button>
                {getStatusActions(order).map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={action.onClick}
                    title={action.title}
                    className="hover:opacity-80"
                  >
                    {action.icon}
                  </button>
                ))}
                <button 
                  onClick={() => onDelete(order.id)} 
                  title="Delete"
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {orders.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No purchase orders found.
        </div>
      ) : (
        <>
          {renderMobileCards()}
          {renderTableView()}
        </>
      )}
    </div>
  );
};

export default PurchaseOrderTable;
