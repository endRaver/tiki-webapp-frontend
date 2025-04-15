import { useEffect } from "react";
import CartHeader from "./components/CartHeader";
import CartList from "./components/CartList.tsx";
import { useCartStore } from "@/store/useCartStore";
import { isEmpty } from "lodash";
import EmptyCart from "./components/EmptyCart.tsx";
import CartSummary from "./components/CartSummary.tsx";

const CartPage: React.FC = () => {
  const { handleGetCartItems, cart, setSelectedCart, setGroupCart } =
    useCartStore();

  useEffect(() => {
    handleGetCartItems();
    setSelectedCart([]);
    setGroupCart([]);
  }, [handleGetCartItems, setGroupCart, setSelectedCart]);

  return (
    <div className="bg-background px-6 py-6">
      <div className="container mx-auto">
        <div className="font-inter mb-3 text-[20px] font-[500] text-black">
          GIỎ HÀNG
        </div>

        {isEmpty(cart) ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="mr-5 min-w-0 flex-1 space-y-4">
              <CartHeader />
              <CartList />
            </div>

            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
