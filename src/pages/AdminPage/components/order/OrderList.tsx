import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Order } from "@/types/order";

const OrderList = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="rounded border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Orders: {orders.length}
        </h2>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">
              Order Number
            </th>
            <th className="border border-gray-200 p-2 text-left">Status</th>
            <th className="border border-gray-200 p-2 text-left">Total</th>
            <th className="border border-gray-200 p-2 text-left">Created At</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-10 text-center">
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
            orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="p-2">{order.orderNumber}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{order.totalAmount} VNĐ</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="flex space-x-2 p-2">
                  <Link
                    to={`/admin/orders/edit/${order._id}`}
                    state={{ order }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
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
export default OrderList;
