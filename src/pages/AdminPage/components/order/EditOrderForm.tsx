import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../common/Button";
import { useOrderStore } from "@/store/useOrderStore";
import toast from "react-hot-toast";

const EditOrderForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleGetOrderById, currentOrder, handleUpdateOrder } =
    useOrderStore();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    status: "pending",
  });

  useEffect(() => {
    if (id) {
      handleGetOrderById(id);
    }
  }, [handleGetOrderById, id]);

  useEffect(() => {
    if (currentOrder) {
      setFormData({ status: currentOrder.status });
    }
  }, [currentOrder]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ status: e.target.value });
  };

  const handleSubmit = async () => {
    if (id && currentOrder) {
      try {
        const updatedOrder = {
          ...currentOrder,
          status: formData.status,
        };
        await handleUpdateOrder(id, updatedOrder);
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
      <div className="py-10 text-center text-red-500">
        Invalid order ID. Please go back and try again.
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        {error}
        <div className="mt-4">
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Go back to orders
          </Link>
        </div>
      </div>
    );
  }
  if (!currentOrder) {
    return <div className="py-10 text-center">Loading order...</div>;
  }
  return (
    <div className="flex-1 p-6">
      <div className="mb-4 flex items-center">
        <Link
          to="/admin/orders"
          className="mr-2 text-gray-500 hover:text-gray-700"
        >
          <FaChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Order</h1>
      </div>
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            1. Order Information
          </h2>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">
              <span className="text-red-500">*</span> Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditOrderForm;
