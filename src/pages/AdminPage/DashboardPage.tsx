import React, { useEffect, useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useProductStore } from "@/store/useProductStore";
import { useOrderStore } from "@/store/useOrderStore";
import { toast } from "react-hot-toast";
import {
  format,
  startOfDay,
  startOfWeek,
  addDays,
  eachWeekOfInterval,
  subDays,
} from "date-fns";
import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";

interface RevenueData {
  name: string;
  revenue: number;
}

interface OrderStatusData {
  name: string;
  value: number;
}

interface RevenueByCategoryData {
  name: string;
  revenue: number;
}

interface TopProductData {
  name: string;
  quantity: number;
}

interface OrderProduct {
  product: string;
  quantity: number;
  price: number;
  _id?: string;
}

interface LocalOrder {
  _id: string;
  orderNumber: string;
  user: string;
  products: OrderProduct[];
  status: string;
  shippingPrice: number;
  shippingDate: string;
  shippingDiscount: number;
  paymentMethod: string;
  totalAmount: number;
  stripeSessionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CategorySalesData {
  name: string;
  totalSold: number;
}

const DashboardPage: React.FC = () => {
  const { products, handleGetProductByCategory } = useProductStore();
  const { orders: rawOrders, handleGetAllOrders } = useOrderStore();
  const orders = rawOrders as unknown as LocalOrder[];
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);
  const [revenueByCategoryData, setRevenueByCategoryData] = useState<
    RevenueByCategoryData[]
  >([]);
  const [topProductsData, setTopProductsData] = useState<TopProductData[]>([]);
  const [categorySalesData, setCategorySalesData] = useState<
    CategorySalesData[]
  >([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [timeFrame, setTimeFrame] = useState<"day" | "week">("day");
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  // Calculate revenue by day (only delivered orders)
  const calculateRevenueByDay = useCallback(() => {
    if (!orders || orders.length === 0) {
      const endDate = startOfDay(new Date());
      const startDate = subDays(endDate, 30);
      const data: RevenueData[] = [];
      for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        data.push({
          name: format(d, "dd/MM"),
          revenue: 0,
        });
      }
      return data;
    }

    const revenueMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.status === "delivered")
      .forEach((order) => {
        try {
          const orderDate = startOfDay(new Date(order.createdAt));
          const dateKey = format(orderDate, "yyyy-MM-dd");
          revenueMap[dateKey] = (revenueMap[dateKey] || 0) + order.totalAmount;
        } catch (error) {
          console.warn(
            "Error calculating revenue for order:",
            order._id,
            error,
          );
        }
      });

    const dates = orders
      .map((o) => new Date(o.createdAt))
      .filter((d) => !isNaN(d.getTime()));
    if (dates.length === 0) {
      const endDate = startOfDay(new Date());
      const startDate = subDays(endDate, 30);
      const data: RevenueData[] = [];
      for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        data.push({
          name: format(d, "dd/MM"),
          revenue: 0,
        });
      }
      return data;
    }

    const startDate = startOfDay(
      new Date(Math.min(...dates.map((d) => d.getTime()))),
    );
    const endDate = startOfDay(new Date());
    const data: RevenueData[] = [];

    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
      const dateKey = format(d, "yyyy-MM-dd");
      data.push({
        name: format(d, "dd/MM"),
        revenue: revenueMap[dateKey] || 0,
      });
    }

    return data;
  }, [orders]);

  // Calculate revenue by week (only delivered orders)
  const calculateRevenueByWeek = useCallback(() => {
    if (!orders || orders.length === 0) {
      const endDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      const startDate = subDays(endDate, 12 * 7);
      const weeks = eachWeekOfInterval(
        { start: startDate, end: endDate },
        { weekStartsOn: 1 },
      );
      const data = weeks.map((week) => ({
        name: `Week ${format(week, "ww")}`,
        revenue: 0,
      }));
      return data;
    }

    const revenueMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.status === "delivered")
      .forEach((order) => {
        try {
          const orderWeek = startOfWeek(new Date(order.createdAt), {
            weekStartsOn: 1,
          });
          const weekKey = format(orderWeek, "yyyy-MM-dd");
          revenueMap[weekKey] = (revenueMap[weekKey] || 0) + order.totalAmount;
        } catch (error) {
          console.warn(
            "Error calculating revenue for order:",
            order._id,
            error,
          );
        }
      });

    const dates = orders
      .map((o) => new Date(o.createdAt))
      .filter((d) => !isNaN(d.getTime()));
    if (dates.length === 0) {
      const endDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      const startDate = subDays(endDate, 12 * 7);
      const weeks = eachWeekOfInterval(
        { start: startDate, end: endDate },
        { weekStartsOn: 1 },
      );
      const data = weeks.map((week) => ({
        name: `Week ${format(week, "ww")}`,
        revenue: 0,
      }));
      return data;
    }

    const startDate = startOfWeek(
      new Date(Math.min(...dates.map((d) => d.getTime()))),
      { weekStartsOn: 1 },
    );
    const endDate = startOfWeek(new Date(), { weekStartsOn: 1 });

    const weeks = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 },
    );

    const data: RevenueData[] = weeks.map((week) => {
      const weekKey = format(week, "yyyy-MM-dd");
      return {
        name: `Week ${format(week, "ww")}`,
        revenue: revenueMap[weekKey] || 0,
      };
    });

    return data;
  }, [orders]);

  // Calculate order status distribution
  const calculateOrderStatusDistribution = useCallback(() => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return [];
    }

    const statusMap: { [key: string]: number } = {};

    orders.forEach((order) => {
      const status = order.status || "unknown";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const data = Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
    }));
    return data;
  }, [orders]);

  // Calculate revenue by category (only delivered orders)
  const calculateRevenueByCategory = useCallback(() => {
    if (
      !orders ||
      !Array.isArray(orders) ||
      orders.length === 0 ||
      !products ||
      products.length === 0
    ) {
      return [];
    }

    const categoryRevenueMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.status === "delivered")
      .forEach((order) => {
        order.products.forEach((item) => {
          const product = products.find((p) => p._id === item.product);
          if (product && product.categories?.name) {
            const category = product.categories.name;
            categoryRevenueMap[category] =
              (categoryRevenueMap[category] || 0) + item.quantity * item.price;
          } else {
            console.warn(
              `Product ${item.product} not found or no category for order ${order._id}`,
            );
          }
        });
      });

    const data = Object.entries(categoryRevenueMap)
      .map(([name, revenue]) => ({
        name,
        revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    return data;
  }, [orders, products]);

  // Calculate top products (only delivered orders)
  const calculateTopProducts = useCallback(() => {
    if (
      !orders ||
      !Array.isArray(orders) ||
      orders.length === 0 ||
      !products ||
      products.length === 0
    ) {
      return [];
    }

    const productQuantityMap: {
      [key: string]: { name: string; quantity: number };
    } = {};

    orders
      .filter((order) => order.status === "delivered")
      .forEach((order) => {
        order.products.forEach((item) => {
          const product = products.find((p) => p._id === item.product);
          if (product) {
            const productId = product._id;
            if (!productQuantityMap[productId]) {
              productQuantityMap[productId] = {
                name: product.name,
                quantity: 0,
              };
            }
            productQuantityMap[productId].quantity += item.quantity;
          } else {
            console.warn(
              `Product ${item.product} not found for order ${order._id}`,
            );
          }
        });
      });

    const data = Object.values(productQuantityMap)
      .filter((product) => product.quantity > 0)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    return data;
  }, [orders, products]);

  // Calculate total revenue (only delivered orders)
  const calculateTotalRevenue = useCallback(() => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return 0;
    }
    const total = orders
      .filter((order) => order.status === "delivered")
      .reduce((sum, order) => sum + order.totalAmount, 0);
    return total;
  }, [orders]);

  // Calculate sales distribution by category based on quantity_sold (top 3 only)
  const calculateSalesByCategory = useCallback(() => {
    if (!products || products.length === 0) {
      return [];
    }

    const categorySalesMap: { [key: string]: number } = {};

    products.forEach((product) => {
      const category = product.categories?.name || "Unknown";
      const sold = product.quantity_sold?.value || 0;
      if (sold > 0) {
        categorySalesMap[category] = (categorySalesMap[category] || 0) + sold;
      }
    });

    const data = Object.entries(categorySalesMap)
      .map(([name, totalSold]) => ({
        name,
        totalSold,
      }))
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 3); // Only top 3 categories
    return data;
  }, [products]);

  // Fetch data: Use provided categories and fetch products for each category
  const fetchDashboardData = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const categories = [
        "English Books",
        "Fiction - Literature",
        "Grammar, vocabulary & skills",
        "Sách kỹ năng làm việc",
        "Sách tiếng Việt",
        "Sách tư duy - Kỹ năng sống",
        "Truyện ngắn - Tản văn - Tạp Văn",
        "Tác phẩm kinh điển",
      ];

      const allProducts: Product[] = [];
      for (const category of categories) {
        await handleGetProductByCategory(category);
        const categoryProducts = useProductStore.getState().products;
        console.log(`Products for category ${category}:`, categoryProducts);
        categoryProducts.forEach((product) => {
          if (!allProducts.some((p) => p._id === product._id)) {
            allProducts.push(product);
          }
        });
      }

      console.log("All combined products:", allProducts);
      useProductStore.setState({ products: allProducts });
      await handleGetAllOrders();
      setHasFetched(true);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const revenue =
      timeFrame === "day" ? calculateRevenueByDay() : calculateRevenueByWeek();
    setRevenueData(revenue);
    if (hasFetched) {
      setOrderStatusData(calculateOrderStatusDistribution());
      setRevenueByCategoryData(calculateRevenueByCategory());
      setTopProductsData(calculateTopProducts());
      setCategorySalesData(calculateSalesByCategory());
      setTotalRevenue(calculateTotalRevenue());
    }
  }, [
    timeFrame,
    calculateRevenueByDay,
    calculateRevenueByWeek,
    calculateOrderStatusDistribution,
    calculateRevenueByCategory,
    calculateTopProducts,
    calculateSalesByCategory,
    calculateTotalRevenue,
    hasFetched,
    products,
    orders,
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders?.length || 0;

  const formatYAxis = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M VND`;
    }
    return `${value.toLocaleString("en-US")} VND`;
  };

  const formatXAxisLabel = (value: string) => {
    if (value.length > 10) {
      return `${value.substring(0, 7)}...`;
    }
    return value;
  };

  const renderCustomizedLabel = ({ percent }: { percent: number }) => {
    return `${(percent * 100).toFixed(1)}%`;
  };

  const COLORS = ["#93C5FD", "#68D391", "#FCA5A5", "#FBB6CE", "#A5B4FC"];

  return (
    <div className="h-[calc(100vh-64px)] flex-1 overflow-auto bg-[#D6E4FF] p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">Admin Dashboard</h1>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" color="#3B82F6" />
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Revenue
            </h2>
            <p className="mt-2 text-3xl font-bold text-[#3B82F6]">
              {totalRevenue.toLocaleString("en-US")} VND
            </p>
            <p className="mt-1 text-gray-500">All time (Delivered)</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="mt-2 text-3xl font-bold text-[#10B981]">
              {totalOrders}
            </p>
            <p className="mt-1 text-gray-500">All time</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Products
            </h2>
            <p className="mt-2 text-3xl font-bold text-[#8B5CF6]">
              {totalProducts}
            </p>
            <p className="mt-1 text-gray-500">Across all categories</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">
                Revenue by {timeFrame === "day" ? "Day" : "Week"}
              </h2>
              <div>
                <button
                  className={`mr-2 rounded px-4 py-2 ${timeFrame === "day" ? "bg-[#3B82F6] text-white" : "bg-[#CBD5E1]"}`}
                  onClick={() => setTimeFrame("day")}
                >
                  By Day
                </button>
                <button
                  className={`rounded px-4 py-2 ${timeFrame === "day" ? "bg-[#CBD5E1]" : "bg-[#3B82F6] text-white"}`}
                  onClick={() => setTimeFrame("week")}
                >
                  By Week
                </button>
              </div>
            </div>
            <div className="h-64">
              {revenueData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 50,
                      bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" />
                    <XAxis
                      dataKey="name"
                      interval={timeFrame === "day" ? 3 : 1}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                      tick={{ fontSize: 12, fill: "#4B5563" }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={formatYAxis}
                      domain={["auto", "auto"]}
                      tickCount={5}
                      tick={{ fontSize: 11, fill: "#4B5563" }}
                      stroke="#4B5563"
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        `${value.toLocaleString("en-US")} VND`
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#93C5FD"
                      fill="#93C5FD"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Order Status Distribution
            </h2>
            <div className="h-64">
              {orderStatusData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#93C3FD"
                      dataKey="value"
                      label={renderCustomizedLabel}
                      labelLine={true}
                    >
                      {orderStatusData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} orders`} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "#4B5563" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Revenue by Category (Top 5)
            </h2>
            <div className="h-64">
              {revenueByCategoryData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueByCategoryData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 40,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" />
                    <XAxis
                      dataKey="name"
                      tickFormatter={formatXAxisLabel}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                      tick={{ fontSize: 12, fill: "#4B5563" }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={formatYAxis}
                      tick={{ fontSize: 11, fill: "#4B5563" }}
                      stroke="#4B5563"
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        `${value.toLocaleString("en-US")} VND`
                      }
                    />
                    <Bar dataKey="revenue" fill="#68D391" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Top Products (Units Sold)
            </h2>
            <div className="h-64">
              {topProductsData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topProductsData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" />
                    <XAxis
                      dataKey="name"
                      tickFormatter={formatXAxisLabel}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12, fill: "#4B5563" }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={(value) => value.toLocaleString("en-US")}
                      tick={{ fontSize: 12, fill: "#4B5563" }}
                      stroke="#4B5563"
                    />
                    <Tooltip formatter={(value: number) => `${value} units`} />
                    <Bar dataKey="quantity" fill="#A5B4FC" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Sales by Category (Units Sold - Top 3)
            </h2>
            <div className="h-64">
              {categorySalesData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categorySalesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#FBB6CE"
                      dataKey="totalSold"
                      label={renderCustomizedLabel}
                      labelLine={true}
                    >
                      {categorySalesData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} units`} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "#4B5563" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
