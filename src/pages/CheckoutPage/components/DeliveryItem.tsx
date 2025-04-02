import { delivery_box, checkout_delivery, info } from "@/assets/icons";

const DeliveryItem = ({ product }: { product: unknown }) => {
  return (
    <div className="relative rounded-xl border border-[#DDDDE3] px-4 pt-5 pb-4">
      <div className="absolute -top-3.5 left-3 flex items-center bg-white ps-1 pe-3">
        <img src={delivery_box} alt="delivery-box" />
        <span className="text-success-100 text-sm">
          Gói: Giao siêu tốc 2h, trước 13h hôm nay
        </span>
      </div>

      <div className="max-w-[482px] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={checkout_delivery} alt="delivery" />
            <span className="text-xs uppercase">Giao siêu tốc 2h</span>
          </div>

          <div className="flex items-center gap-2 font-medium">
            <span className="text-xs text-neutral-600 line-through">
              25.000 <span className="underline underline-offset-1">đ</span>
            </span>

            <div className="flex items-center gap-0.5">
              <span className="text-success-100 text-sm font-medium">
                MIỄN PHÍ
              </span>
              <img src={info} alt="info" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-12 bg-cover bg-center">
            <img src={product.images[0].base_url} alt={product.name} />
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <h3 className="text-sm text-neutral-600">{product.name}</h3>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-600">SL: x1</span>

              <div className="flex items-center gap-1">
                <span className="text-xs text-neutral-600 line-through">
                  169.000{" "}
                  <span className="underline underline-offset-1">đ</span>
                </span>

                <span className="text-danger-100 text-sm font-medium">
                  110.000{" "}
                  <span className="underline underline-offset-1">đ</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryItem;
