import { return_badge } from "@/assets/icons/profile_page_icons";
import { formatCurrency } from "@/utils/utils";
import { useOrderStore } from "@/store/useOrderStore";
import { map } from "lodash";

const ProductTable = () => {
  const { currentOrder } = useOrderStore();

  const totalPrice = currentOrder?.products.reduce(
    (acc, product) =>
      acc + product.product.current_seller.price * product.quantity,
    0,
  );

  return (
    <div className="w-full rounded bg-white">
      <table className="w-full border-collapse">
        <thead className="border-b border-[#F4F4F4]">
          <tr className="flex w-full text-[15px] font-normal text-[#787878]">
            <th className="flex-3 px-4 py-5 text-left font-normal">Sản phẩm</th>
            <th className="hidden flex-1 px-4 py-5 text-left font-normal sm:block">
              Giá
            </th>
            <th className="hidden flex-1 px-4 py-5 text-left font-normal sm:block">
              Số lượng
            </th>
            <th className="hidden flex-1 px-4 py-5 text-left font-normal sm:block">
              Giảm giá
            </th>
            <th className="flex-2 px-4 py-5 text-right font-normal">
              Tạm tính
            </th>
          </tr>
        </thead>

        <tbody>
          {map(currentOrder?.products, (product) => (
            <tr
              className="flex w-full border-b border-[#F4F4F4]"
              key={product.product._id}
            >
              <td className="sm:flex-3 px-4 py-5">
                <div className="flex gap-4">
                  <div
                    className="aspect-square size-[60px] rounded-sm bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${product.product.images[0].base_url})`,
                    }}
                  />

                  <div>
                    <p className="text-sm">{product.product.name}</p>
                    <p className="mt-4 text-xs">
                      Cung cấp bởi{" "}
                      <span className="text-primary-300">Tiki Trading</span>
                    </p>

                    <img
                      className="mt-3.5"
                      src={return_badge}
                      alt="return_badge"
                    />

                    <p className="mt-5 text-[13px]">
                      Sku: {product.product.current_seller.sku}
                    </p>
                    <button className="mt-2 rounded border px-3 py-1 text-xs text-[#189EFF] hover:bg-blue-50">
                      Chat với nhà bán
                    </button>
                  </div>
                </div>
              </td>

              <td className="hidden px-4 py-5 text-[13px] sm:flex-1">
                {formatCurrency(product.product.original_price)}{" "}
                <span className="underline underline-offset-1">đ</span>
              </td>
              <td className="hidden px-4 py-5 text-[13px] sm:flex-1">
                {product.quantity}
              </td>
              <td className="hidden px-4 py-5 text-[13px] sm:flex-1">
                {formatCurrency(
                  product.product.original_price -
                    product.product.current_seller.price,
                )}{" "}
                <span className="underline underline-offset-1">đ</span>
              </td>
              <td className="flex-2 px-4 py-5 text-right text-[13px]">
                {formatCurrency(
                  product.product.current_seller.price * product.quantity,
                )}{" "}
                <span className="underline underline-offset-1">đ</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-5 py-7.5 text-sm">
        <div className="grid grid-cols-2 items-center">
          <span className="py-2 text-[#787878]">Tạm tính</span>
          <span className="text-right text-[13px]">
            {formatCurrency(totalPrice ?? 0)}
          </span>
          <span className="py-2 text-[#787878]">Phí vận chuyển</span>
          <span className="text-right text-[13px]">
            {formatCurrency(currentOrder?.shippingPrice ?? 0)}
          </span>
          <span className="py-2 text-[#787878]">Giảm giá vận chuyển</span>
          <span className="text-right text-[13px]">
            {formatCurrency(currentOrder?.shippingDiscount ?? 0)}
          </span>
          <span className="py-2 text-[#787878]">Tổng cộng</span>
          <span className="text-right text-lg text-[#FF3B27]">
            {formatCurrency(currentOrder?.totalAmount ?? 0)} đ
          </span>
        </div>

        <div className="mt-1 flex justify-end">
          <button className="cursor-pointer rounded bg-[#FDD835] px-3 py-2">
            Hủy đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
