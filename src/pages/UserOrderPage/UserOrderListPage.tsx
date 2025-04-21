import { empty_order } from "@/assets/icons/order_page_icons";
import { useOrderStore } from "@/store/useOrderStore";
import { useUserStore } from "@/store/useUserStore";
import { formatCurrency } from "@/utils/utils";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const tabs = [
  { id: "all", name: "Tất cả đơn" },
  { id: "pending", name: "Chờ thanh toán" },
  { id: "confirmed", name: "Đang xử lý" },
  { id: "shipped", name: "Đang vận chuyển" },
  { id: "delivered", name: "Đã giao" },
  { id: "cancelled", name: "Đã hủy" },
];

const UserOrderListPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { user } = useUserStore();
  const { orders, handleGetOrdersByUserId } = useOrderStore();
  const [ordersFilter, setOrdersFilter] = useState(orders);

  useEffect(() => {
    if (user) {
      handleGetOrdersByUserId(user._id);
    }
    if (orders) {
      if (activeTab === "all") {
        setOrdersFilter(orders);
      } else {
        const filtered = orders.filter((order) => order.status === activeTab);
        setOrdersFilter(filtered);
      }
    }
  }, [handleGetOrdersByUserId, user, orders, activeTab]);

  return (
    <div className="mb-4 w-full">
      <h5 className="hidden text-[19px] font-light md:block">
        Đơn hàng của tôi
      </h5>

      <div className="mt-5 hidden text-sm md:flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 cursor-pointer border-b-2 bg-white py-2.5 text-center text-nowrap ${
              activeTab === tab.id
                ? "border-b-primary-500 text-primary-500"
                : "border-b-transparent text-neutral-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="border-border-line my-3 flex flex-1 items-center gap-2 rounded border bg-white px-2">
        <IoMdSearch color="#808089" size={24} />
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
          className="w-full py-2 text-sm text-neutral-500 outline-none"
        />
      </div>

      {isEmpty(ordersFilter) ? (
        <div className="flex flex-col items-center justify-center bg-white p-[35px]">
          <img src={empty_order} alt="empty_order" className="size-[200px]" />
          <p className="text-center text-neutral-500">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {ordersFilter?.map((order) => (
            <Link to={`/profile/orders/${order._id}`} key={order._id}>
              <div className="cursor-pointer bg-white px-6 py-3 duration-300 hover:shadow-md">
                <div className="border-border-line flex items-center justify-between border-b pb-2 text-sm">
                  <span className="font-semibold text-neutral-500">
                    Tiki Trading
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-[166px] font-light text-nowrap">
                      Mã đơn hàng: {order.orderNumber}
                    </span>

                    <span className="bg-border-line h-4 w-[1px]" />
                    {order.status === "pending" && (
                      <span className="text-primary-500 min-w-[100px]">
                        Chờ thanh toán
                      </span>
                    )}
                    {order.status === "confirmed" && (
                      <span className="text-emerald-500">Đã xác nhận</span>
                    )}
                  </div>
                </div>

                <div className="border-border-line mt-3 flex gap-2 border-b pb-4">
                  <div
                    className="border-border-line size-[82px] border bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${order.products?.[0]?.product?.images?.[0]?.medium_url || ""})`,
                    }}
                  />

                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold">
                        {order.products?.[0]?.product?.name ||
                          "Product name not available"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Số lượng: {order.products?.[0]?.quantity || 0}
                      </p>
                    </div>

                    <div className="flex gap-2 text-sm">
                      <span className="text-neutral-500 line-through">
                        {formatCurrency(
                          (order.products?.[0]?.product?.original_price || 0) *
                            (order.products?.[0]?.quantity || 0),
                        )}
                        <span className="underline underline-offset-1">đ</span>
                      </span>

                      <span className="text-primary-500">
                        {formatCurrency(
                          (order.products?.[0]?.product?.current_seller
                            ?.price || 0) *
                            (order.products?.[0]?.quantity || 0),
                        )}
                        <span className="underline underline-offset-1">đ</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 py-4">
                  <p className="text-sm">Thành tiền:</p>
                  <p className="text-primary-500 text-xl">
                    {formatCurrency(order.totalAmount)}
                    <span className="text-sm underline underline-offset-1">
                      đ
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderListPage;
