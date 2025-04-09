import { formatCurrency } from "@/utils/utils";
import type { Product } from "@/types/product";

const ItemInformation = ({
  item,
}: {
  item: Product & { quantity: number };
}) => {
  return (
    <div className="flex items-center gap-2 py-3">
      <div className="h-12 w-12 bg-cover bg-center">
        <img src={item.images[0].base_url} alt={item.name} />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="text-sm text-neutral-600">{item.name}</h3>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-neutral-600">SL: x{item.quantity}</span>

          <div className="flex items-center gap-1">
            {item.original_price !== item.current_seller.price && (
              <span className="text-xs text-neutral-600 line-through">
                {formatCurrency(item.original_price)}{" "}
                <span className="underline underline-offset-1">đ</span>
              </span>
            )}

            <span className="text-danger-100 text-sm font-medium">
              {formatCurrency(item.current_seller.price)}{" "}
              <span className="underline underline-offset-1">đ</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInformation;
