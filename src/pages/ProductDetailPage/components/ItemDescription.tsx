import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";

const ItemDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentProduct } = useProductStore();
  
  return (
    <div className="flex flex-col rounded-lg bg-white p-4">
      <span className="font-semibold">Mô tả sản phẩm</span>
      <div className="relative">
        <div
          className={`mt-5 space-y-4 ${!isExpanded ? "max-h-40 overflow-hidden" : ""}`}
          dangerouslySetInnerHTML={{
            __html: currentProduct?.description ?? "",
          }}
        />
        {!isExpanded && (
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-30 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        className="cursor-pointer p-2 text-sm text-[#189EFF]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {!isExpanded ? "Xem thêm" : "Thu gọn"}
      </button>
    </div>
  );
};

export default ItemDescription;
