import React from 'react';
import { 
  FaReceipt, 
  FaEdit, 
  FaCheck, 
  FaTimes, 
  FaBan,
  FaTruck,
  FaFileInvoiceDollar
} from 'react-icons/fa';

const PurchaseOrderDetailsModal = ({ 
  order, 
  onClose, 
  onEdit, 
  onApprove, 
  onReject, 
  onCancel,
  onUpdateStatus
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Ordered': return 'bg-indigo-100 text-indigo-800';
      case 'Partially Received': return 'bg-purple-100 text-purple-800';
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Invoiced': return 'bg-orange-100 text-orange-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = () => {
    const actions = [];
    switch (order.status) {
      case 'Pending Approval':
        actions.push({
          icon: <FaCheck size={16} className="mr-2" />,
          label: 'Approve',
          colorClass: 'bg-green-600 hover:bg-green-700 text-white',
          onClick: () => onApprove(order.id)
        });
        actions.push({
          icon: <FaTimes size={16} className="mr-2" />,
          label: 'Reject',
          colorClass: 'bg-red-600 hover:bg-red-700 text-white',
          onClick: () => onReject(order.id)
        });
        break;
      case 'Approved':
        actions.push({
          icon: <FaTruck size={16} className="mr-2" />,
          label: 'Mark as Ordered',
          colorClass: 'bg-blue-600 hover:bg-blue-700 text-white',
          onClick: () => onUpdateStatus(order.id, 'Ordered')
        });
        actions.push({
          icon: <FaBan size={16} className="mr-2" />,
          label: 'Cancel Order',
          colorClass: 'bg-red-600 hover:bg-red-700 text-white',
          onClick: () => onCancel(order.id)
        });
        break;
      case 'Ordered':
        actions.push({
          icon: <FaReceipt size={16} className="mr-2" />,
          label: 'Mark as Partially Received',
          colorClass: 'bg-purple-600 hover:bg-purple-700 text-white',
          onClick: () => onUpdateStatus(order.id, 'Partially Received')
        });
        actions.push({
          icon: <FaCheck size={16} className="mr-2" />,
          label: 'Mark as Received',
          colorClass: 'bg-green-600 hover:bg-green-700 text-white',
          onClick: () => onUpdateStatus(order.id, 'Received')
        });
        break;
      case 'Partially Received':
        actions.push({
          icon: <FaCheck size={16} className="mr-2" />,
          label: 'Mark as Fully Received',
          colorClass: 'bg-green-600 hover:bg-green-700 text-white',
          onClick: () => onUpdateStatus(order.id, 'Received')
        });
        break;
      case 'Received':
        actions.push({
          icon: <FaFileInvoiceDollar size={16} className="mr-2" />,
          label: 'Mark as Invoiced',
          colorClass: 'bg-orange-600 hover:bg-orange-700 text-white',
          onClick: () => onUpdateStatus(order.id, 'Invoiced')
        });
        break;
      case 'Invoiced':
        actions.push({
          icon: <FaCheck size={16} className="mr-2" />,
          label: 'Mark as Paid',
          colorClass: 'bg-green-600 hover:bg-green-700 text-white',
          onClick: () => onUpdateStatus(order.id, 'Paid')
        });
        break;
      default:
        break;
    }
    return actions;
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaReceipt className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center justify-between">
                  <span>Purchase Order: {order.id}</span>
                  <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </h3>

                <div className="mt-4 divide-y space-y-4">
                  {/* Order summary */}
                  <div className="pb-3">
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-sm font-medium">{formatDate(order.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vendor</p>
                        <p className="text-sm font-medium">{order.vendorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Request ID</p>
                        <p className="text-sm font-medium">{order.requestId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expected Delivery</p>
                        <p className="text-sm font-medium">{formatDate(order.expectedDelivery)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="pt-3 pb-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
                              <td className="px-3 py-2 text-sm text-right text-gray-500">{item.quantity}</td>
                              <td className="px-3 py-2 text-sm text-right text-gray-500">{formatCurrency(item.unitPrice)}</td>
                              <td className="px-3 py-2 text-sm text-right text-gray-500">{formatCurrency(item.total)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50">
                            <td colSpan="3" className="px-3 py-2 text-sm font-medium text-right">Total:</td>
                            <td className="px-3 py-2 text-sm font-medium text-right">{formatCurrency(order.totalAmount)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 flex justify-end flex-wrap gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(order.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                    )}
                    {getStatusActions().map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${action.colorClass}`}
                      >
                        {action.icon}
                        {action.label}
                      </button>
                    ))}
                    <button
                      onClick={onClose}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default PurchaseOrderDetailsModal;
