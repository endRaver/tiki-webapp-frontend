import { useCartStore } from "@/store/useCartStore";
import { isEmpty, map } from "lodash";
import {
  angle_right,
  discountIcon,
  seller,
  ship,
} from "@/assets/icons/cart_page_icons";
import CartItemComponent from "./CartItemComponent";
import { info } from "@/assets/icons/checkout_page_icons";

const CartList = () => {
  const { groupCart, selectedCart, setSelectedCart } = useCartStore();

  return (
    <div className="flex flex-col gap-2.5">
      {map(
        groupCart,
        (groupItem) =>
          !isEmpty(groupItem.items) && (
            <div className="rounded bg-white" key={groupItem.items[0]._id}>
              <div className="flex items-center gap-2 p-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checked:bg-primary-200 rounded bg-[white] text-white"
                  checked={groupItem.items.every((item) =>
                    selectedCart.some(
                      (selectedItem) => selectedItem._id === item._id,
                    ),
                  )}
                  onChange={() => {
                    const allItemsSelected = groupItem.items.every((item) =>
                      selectedCart.some(
                        (selectedItem) => selectedItem._id === item._id,
                      ),
                    );

                    if (allItemsSelected) {
                      // If all items are selected, remove all items from this group
                      setSelectedCart(
                        selectedCart.filter(
                          (selectedItem) =>
                            !groupItem.items.some(
                              (item) => item._id === selectedItem._id,
                            ),
                        ),
                      );
                    } else {
                      // If not all items are selected, add all items from this group
                      const newSelectedItems = [...selectedCart];
                      groupItem.items.forEach((item) => {
                        if (
                          !newSelectedItems.some(
                            (selectedItem) => selectedItem._id === item._id,
                          )
                        ) {
                          newSelectedItems.push(item);
                        }
                      });
                      setSelectedCart(newSelectedItems);
                    }
                  }}
                />

                <img src={seller} alt="seller" className="h-3.5 w-3.5" />

                <p className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                  {groupItem.items[0].current_seller.seller.name}
                  <img src={angle_right} alt="angle_right" />
                </p>
              </div>

              <div>
                {map(groupItem.items, (item) => (
                  <CartItemComponent key={item._id} item={item} />
                ))}
              </div>

              <div className="border-border-line flex items-center border-t px-4 py-2.5">
                <img src={discountIcon} alt="discountIcon" />
                <p className="mr-2 ml-1 text-sm font-medium">
                  Thêm mã khuyến mãi của Shop
                </p>
                <img src={angle_right} alt="angle_right" className="h-3" />
              </div>

              <div className="border-border-line flex items-center border-t px-4 py-2.5">
                <img src={ship} alt="ship" className="size-4.5" />
                <p className="mr-2 ml-1 text-sm font-medium">
                  Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k info-icon
                </p>
                <img src={info} alt="info" className="size-4" />
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default CartList;
