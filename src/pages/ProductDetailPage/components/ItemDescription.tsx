import { useState } from "react";

const ItemDescription = ({ children }: { children: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="rounded-lg bg-white p-4 flex flex-col">
      <span className="font-semibold">Mô tả sản phẩm</span>
      <div className="relative">
        <div
          className={`mt-5 space-y-4 ${!isExpanded ? "max-h-40 overflow-hidden" : ""}`}
          dangerouslySetInnerHTML={{ __html: children }}
        />
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      <button className="text-[#189EFF] cursor-pointer text-sm p-2" onClick={() => (setIsExpanded(!isExpanded))}>
        {!isExpanded ? "Xem thêm" : "Thu gọn"}
      </button>
    </div>
  );
};

export default ItemDescription;
