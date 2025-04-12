import { return_badge } from "@/assets/icons/profile_page_icons";
import { formatCurrency } from "@/utils/utils";

const ProductTable = () => {
  return (
    <div className="w-full rounded bg-white">
      <table className="w-full border-collapse">
        <thead className="border-b border-[#F4F4F4]">
          <tr className="flex w-full text-[15px] font-normal text-[#787878]">
            <th className="flex-3 px-4 py-5 text-left font-normal">Sản phẩm</th>
            <th className="flex-1 px-4 py-5 text-left font-normal">Giá</th>
            <th className="flex-1 px-4 py-5 text-left font-normal">Số lượng</th>
            <th className="flex-1 px-4 py-5 text-left font-normal">Giảm giá</th>
            <th className="flex-2 px-4 py-5 text-right font-normal">
              Tạm tính
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="flex w-full border-b border-[#F4F4F4]">
            <td className="flex-3 px-4 py-5">
              <div className="flex gap-4">
                <div
                  className="aspect-square size-[60px] rounded-sm bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://salt.tikicdn.com/cache/750x750/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png)`,
                  }}
                />

                <div>
                  <p className="text-sm">Chat GPT Thực Chiến</p>
                  <p className="mt-4 text-xs">
                    Cung cấp bởi{" "}
                    <span className="text-primary-300">Tiki Trading</span>
                  </p>

                  <img
                    className="mt-3.5"
                    src={return_badge}
                    alt="return_badge"
                  />

                  <p className="mt-5 text-[13px]">Sku: 9831074249227</p>
                  <button className="mt-2 rounded border px-3 py-1 text-xs text-[#189EFF] hover:bg-blue-50">
                    Chat với nhà bán
                  </button>
                </div>
              </div>
            </td>

            <td className="flex-1 px-4 py-5 text-[13px]">
              {formatCurrency(110000)}{" "}
              <span className="underline underline-offset-1">đ</span>
            </td>
            <td className="flex-1 px-4 py-5 text-[13px]">1</td>
            <td className="flex-1 px-4 py-5 text-[13px]">
              0 <span className="underline underline-offset-1">đ</span>
            </td>
            <td className="flex-2 px-4 py-5 text-right text-[13px]">
              {formatCurrency(110000)}{" "}
              <span className="underline underline-offset-1">đ</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="px-5 py-7.5 text-sm">
        <div className="grid grid-cols-2 items-center">
          <span className="py-2 text-[#787878]">Tạm tính</span>
          <span className="text-right text-[13px]">110.000 đ</span>
          <span className="py-2 text-[#787878]">Phí vận chuyển</span>
          <span className="text-right text-[13px]">25.000 đ</span>
          <span className="py-2 text-[#787878]">Giảm giá vận chuyển</span>
          <span className="text-right text-[13px]">-25.000 đ</span>
          <span className="py-2 text-[#787878]">Tổng cộng</span>
          <span className="text-right text-lg text-[#FF3B27]">110.000 đ</span>
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
