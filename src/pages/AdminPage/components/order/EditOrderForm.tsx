import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../common/Button";
import { useOrderAdminStore } from "@/store/useOrderAdminStore";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

const EditOrderForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { updateOrder, loading } = useOrderAdminStore();

  const [order, setOrder] = useState(location.state?.order || null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    status: "",
  });

  const fetchOrder = async () => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (err) {
      setError("Failed to fetch order. Please try again.");
      toast.error("Failed to fetch order.");
    }
  };

  useEffect(() => {
    if (!order && id) {
      fetchOrder();
    }
  }, [order, id]);

  useEffect(() => {
    if (order) {
      setFormData({
        status: order.status || "",
      });
    }
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ status: e.target.value });
  };

  const handleSubmit = async () => {
    if (id && order) {
      try {
        const updatedOrder = {
          ...order,
          status: formData.status,
        };
        await updateOrder(id, updatedOrder);
        navigate("/admin/orders");
      } catch (error) {
        setError("Failed to update order. Please try again.");
        toast.error("Failed to update order.");
        console.error("Failed to update order:", error);
      }
    } else {
      setError("Order data is missing. Please try again.");
      toast.error("Order data is missing.");
    }
  };

  if (!id) {
    return (
      <div className="text-center py-10 text-red-500">
        Invalid order ID. Please go back and try again.
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
        <div className="mt-4">
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Go back to orders
          </Link>
        </div>
      </div>
    );
  }
  if (!order) {
    return <div className="text-center py-10">Loading order...</div>;
  }
  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <Link to="/admin/orders" className="text-gray-500 hover:text-gray-700 mr-2">
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Order</h1>
      </div>
      <div className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Order Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <span className="text-red-500">*</span> Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              disabled={loading}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/orders"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditOrderForm;