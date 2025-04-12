import React from "react";
import { Link } from "react-router-dom";

interface ReturnOrder {
  _id: string;
  orderNumber: string;
  reason: string;
  total: number;
  createdAt: string;
}

interface ReturnOrdersProps {
  returnOrders: ReturnOrder[];
}

const ReturnOrders: React.FC<ReturnOrdersProps> = ({ returnOrders }) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Return Orders: {returnOrders.length}
        </h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Export return orders</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Expand all return orders
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Order Number</th>
            <th className="border border-gray-200 p-2 text-left">Reason</th>
            <th className="border border-gray-200 p-2 text-left">Total</th>
            <th className="border border-gray-200 p-2 text-left">Created At</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {returnOrders.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7h18M3 11h18M3 15h18M3 19h18"
                    />
                  </svg>
                  <p>No Data</p>
                </div>
              </td>
            </tr>
          ) : (
            returnOrders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="p-2">{order.orderNumber}</td>
                <td className="p-2">{order.reason}</td>
                <td className="p-2">{order.total} VNĐ</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-2">
                  <Link
                    to={`/admin/orders/return/edit/${order._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnOrders;