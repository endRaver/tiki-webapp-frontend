import React, { useEffect, useState, useCallback } from 'react';
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
} from 'recharts';
import { useProductStore } from '@/store/useProductStore';
import { useOrderStore } from '@/store/useOrderStore';
import { toast } from 'react-hot-toast';
import { format, startOfDay, startOfWeek, addDays, eachWeekOfInterval, subDays } from 'date-fns';

// Define types
interface RevenueData {
  name: string;
  revenue: number;
}

interface SellerData {
  name: string;
  sales: number;
  percentage?: number;
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
  const { products, sellers, handleFetchAllProduct, handleFetchCategories, handleFetchSellers } = useProductStore();
  const { orders: rawOrders, handleGetAllOrders } = useOrderStore();
  const orders = rawOrders as unknown as LocalOrder[];
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [sellerData, setSellerData] = useState<SellerData[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);
  const [revenueByCategoryData, setRevenueByCategoryData] = useState<RevenueByCategoryData[]>([]);
  const [topProductsData, setTopProductsData] = useState<TopProductData[]>([]);
  const [categorySalesData, setCategorySalesData] = useState<CategorySalesData[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [timeFrame, setTimeFrame] = useState<'day' | 'week'>('day');
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
          name: format(d, 'dd/MM'),
          revenue: 0,
        });
      }
      return data;
    }

    const revenueMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.status === 'delivered')
      .forEach((order) => {
        try {
          const orderDate = startOfDay(new Date(order.createdAt));
          const dateKey = format(orderDate, 'yyyy-MM-dd');
          revenueMap[dateKey] = (revenueMap[dateKey] || 0) + order.totalAmount;
        } catch (error) {
          console.warn('Error calculating revenue for order:', order._id, error);
        }
      });

    const dates = orders.map((o) => new Date(o.createdAt)).filter((d) => !isNaN(d.getTime()));
    if (dates.length === 0) {
      const endDate = startOfDay(new Date());
      const startDate = subDays(endDate, 30);
      const data: RevenueData[] = [];
      for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        data.push({
          name: format(d, 'dd/MM'),
          revenue: 0,
        });
      }
      return data;
    }

    const startDate = startOfDay(new Date(Math.min(...dates.map(d => d.getTime()))));
    const endDate = startOfDay(new Date());
    const data: RevenueData[] = [];

    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
      const dateKey = format(d, 'yyyy-MM-dd');
      data.push({
        name: format(d, 'dd/MM'),
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
      const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 });
      return weeks.map((week) => ({
        name: `Week ${format(week, 'ww')}`,
        revenue: 0,
      }));
    }

    const revenueMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.status === 'delivered')
      .forEach((order) => {
        try {
          const orderWeek = startOfWeek(new Date(order.createdAt), { weekStartsOn: 1 });
          const weekKey = format(orderWeek, 'yyyy-MM-dd');
          revenueMap[weekKey] = (revenueMap[weekKey] || 0) + order.totalAmount;
        } catch (error) {
          console.warn('Error calculating revenue for order:', order._id, error);
        }
      });

    const dates = orders.map((o) => new Date(o.createdAt)).filter((d) => !isNaN(d.getTime()));
    if (dates.length === 0) {
      const endDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      const startDate = subDays(endDate, 12 * 7);
      const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 });
      return weeks.map((week) => ({
        name: `Week ${format(week, 'ww')}`,
        revenue: 0,
      }));
    }

    const startDate = startOfWeek(new Date(Math.min(...dates.map(d => d.getTime()))), { weekStartsOn: 1 });
    const endDate = startOfWeek(new Date(), { weekStartsOn: 1 });

    const weeks = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 }
    );

    const data: RevenueData[] = weeks.map((week) => {
      const weekKey = format(week, 'yyyy-MM-dd');
      return {
        name: `Week ${format(week, 'ww')}`,
        revenue: revenueMap[weekKey] || 0,
      };
    });

    return data;
  }, [orders]);

  // Calculate top sellers (filter <1% and calculate %)
  const calculateTopSellers = useCallback(() => {
    if (!products || !sellers || products.length === 0 || sellers.length === 0) return [];

    const sellerSales: { [key: string]: { name: string; sales: number } } = {};

    sellers.forEach((seller) => {
      sellerSales[seller._id] = { name: seller.name, sales: 0 };
    });

    products.forEach((product) => {
      const sellerId = product.current_seller?.seller?._id;
      if (sellerId && sellerSales[sellerId]) {
        sellerSales[sellerId].sales += product.quantity_sold?.value || 0;
      }
    });

    const totalSales = Object.values(sellerSales).reduce((sum, seller) => sum + seller.sales, 0);

    const filteredSellers = Object.values(sellerSales)
      .map((seller) => {
        const percentage = totalSales > 0 ? (seller.sales / totalSales) * 100 : 0;
        return { ...seller, percentage };
      })
      .filter((seller) => seller.percentage >= 1)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    return filteredSellers;
  }, [products, sellers]);

  // Calculate order status distribution
  const calculateOrderStatusDistribution = useCallback(() => {
    if (!orders || orders.length === 0) return [];

    const statusMap: { [key: string]: number } = {};

    orders.forEach((order) => {
      const status = order.status || 'unknown';
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    return Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [orders]);

  // Calculate revenue by category (only delivered orders)
  const calculateRevenueByCategory = useCallback(() => {
    if (!orders || !products || orders.length === 0 || products.length === 0) return [];

    const categoryRevenueMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.status === 'delivered')
      .forEach((order) => {
        order.products.forEach((item) => {
          const product = products.find((p) => p._id === item.product);
          if (product && product.categories?.name) {
            const category = product.categories.name;
            categoryRevenueMap[category] = (categoryRevenueMap[category] || 0) + order.totalAmount;
          }
        });
      });

    return Object.entries(categoryRevenueMap)
      .map(([name, revenue]) => ({
        name,
        revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders, products]);

  // Calculate top products (only delivered orders)
  const calculateTopProducts = useCallback(() => {
    if (!orders || !products || orders.length === 0 || products.length === 0) return [];

    const productQuantityMap: { [key: string]: { name: string; quantity: number } } = {};

    orders
      .filter((order) => order.status === 'delivered')
      .forEach((order) => {
        order.products.forEach((item) => {
          const product = products.find((p) => p._id === item.product);
          if (product) {
            const productId = product._id;
            if (!productQuantityMap[productId]) {
              productQuantityMap[productId] = { name: product.name, quantity: 0 };
            }
            productQuantityMap[productId].quantity += item.quantity;
          }
        });
      });

    return Object.values(productQuantityMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [orders, products]);

  // Calculate total revenue (only delivered orders)
  const calculateTotalRevenue = useCallback(() => {
    if (!orders || orders.length === 0) return 0;
    return orders
      .filter((order) => order.status === 'delivered')
      .reduce((sum, order) => sum + order.totalAmount, 0);
  }, [orders]);

  // Calculate sales distribution by category based on quantity_sold
  const calculateSalesByCategory = useCallback(() => {
    if (!products || products.length === 0) return [];

    const categorySalesMap: { [key: string]: number } = {};

    products.forEach((product) => {
      const category = product.categories?.name || 'Unknown';
      const sold = product.quantity_sold?.value || 0;
      categorySalesMap[category] = (categorySalesMap[category] || 0) + sold;
    });

    return Object.entries(categorySalesMap)
      .map(([name, totalSold]) => ({
        name,
        totalSold,
      }))
      .sort((a, b) => b.totalSold - a.totalSold);
  }, [products]);

  // Fetch data
  const fetchDashboardData = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      await Promise.all([
        handleFetchAllProduct({ all: true } as any),
        handleFetchCategories(),
        handleFetchSellers(),
        handleGetAllOrders(),
      ]);
      setHasFetched(true);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update data when timeFrame changes or data is fetched
  useEffect(() => {
    const revenue = timeFrame === 'day' ? calculateRevenueByDay() : calculateRevenueByWeek();
    setRevenueData(revenue);
    if (hasFetched) {
      setSellerData(calculateTopSellers());
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
    calculateTopSellers,
    calculateOrderStatusDistribution,
    calculateRevenueByCategory,
    calculateTopProducts,
    calculateSalesByCategory,
    calculateTotalRevenue,
    hasFetched,
  ]);

  // Fetch data on first load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Debug logs
  useEffect(() => {
    console.log('Orders:', orders);
    console.log('Products:', products);
    console.log('Sellers:', sellers);
    console.log('Revenue by Category Data:', revenueByCategoryData);
    console.log('Top Products Data:', topProductsData);
    console.log('Category Sales Data:', categorySalesData);
  }, [orders, products, sellers, revenueByCategoryData, topProductsData, categorySalesData]);

  const totalProducts = products.length;
  const totalOrders = orders?.length || 0;

  // Format Y-axis labels
  const formatYAxis = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M VND`;
    }
    return `${value.toLocaleString('en-US')} VND`;
  };

  // Format X-axis labels
  const formatXAxisLabel = (value: string) => {
    if (value.length > 10) {
      return `${value.substring(0, 7)}...`;
    }
    return value;
  };

  // Format percentage labels for PieChart
  const renderCustomizedLabel = ({ percent }: { percent: number }) => {
    return `${(percent * 100).toFixed(1)}%`;
  };

  const COLORS = ['#93C5FD', '#68D391', '#FCA5A5', '#FBB6CE', '#A5B4FC'];

  return (
    <div className="flex-1 p-6 bg-[#D6E4FF] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3B82F6]"></div>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
            <p className="text-3xl font-bold text-[#3B82F6] mt-2">{totalRevenue.toLocaleString('en-US')} VND</p>
            <p className="text-gray-500 mt-1">All time (Delivered)</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
            <p className="text-3xl font-bold text-[#10B981] mt-2">{totalOrders}</p>
            <p className="text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
            <p className="text-3xl font-bold text-[#8B5CF6] mt-2">{totalProducts}</p>
            <p className="text-gray-500 mt-1">Across all categories</p>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Revenue by {timeFrame === 'day' ? 'Day' : 'Week'}</h2>
              <div>
                <button
                  className={`px-4 py-2 mr-2 rounded ${timeFrame === 'day' ? 'bg-[#3B82F6] text-white' : 'bg-[#CBD5E1]'}`}
                  onClick={() => setTimeFrame('day')}
                >
                  By Day
                </button>
                <button
                  className={`px-4 py-2 rounded ${timeFrame === 'day' ? 'bg-[#CBD5E1]' : 'bg-[#3B82F6] text-white'}`}
                  onClick={() => setTimeFrame('week')}
                >
                  By Week
                </button>
              </div>
            </div>
            <div className="h-64">
              {revenueData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
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
                      interval={timeFrame === 'day' ? 3 : 1}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={formatYAxis}
                      domain={['auto', 'auto']}
                      tickCount={5}
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString('en-US')} VND`} />
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

          {/* Order Status Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Status Distribution</h2>
            <div className="h-64">
              {orderStatusData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
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
                      fill="#93C5FD"
                      dataKey="value"
                      label={renderCustomizedLabel}
                      labelLine={true}
                    >
                      {orderStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} orders`} />
                    <Legend wrapperStyle={{ fontSize: 12, color: '#4B5563' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue by Category (Top 5)</h2>
            <div className="h-64">
              {revenueByCategoryData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueByCategoryData}
                    margin={{
                      top: 10,
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
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={formatYAxis}
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString('en-US')} VND`} />
                    <Bar dataKey="revenue" fill="#68D391" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top Sellers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Sellers (Units Sold)</h2>
            <div className="h-64">
              {sellerData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sellerData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#FCA5A5"
                      dataKey="sales"
                      label={renderCustomizedLabel}
                      labelLine={true}
                    >
                      {sellerData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(props: any) => `${props.payload.percentage.toFixed(1)}%`} />
                    <Legend wrapperStyle={{ fontSize: 12, color: '#4B5563' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Products (Units Sold)</h2>
            <div className="h-64">
              {topProductsData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
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
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={(value) => value.toLocaleString('en-US')}
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <Tooltip formatter={(value: number) => `${value} units`} />
                    <Bar dataKey="quantity" fill="#A5B4FC" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales by Category (Units Sold)</h2>
            <div className="h-64">
              {categorySalesData.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">No data to display</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categorySalesData}
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
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <YAxis
                      tickFormatter={(value) => value.toLocaleString('en-US')}
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      stroke="#4B5563"
                    />
                    <Tooltip formatter={(value: number) => `${value} units`} />
                    <Bar dataKey="totalSold" fill="#FBB6CE" />
                  </BarChart>
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