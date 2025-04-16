import { useEffect } from "react";
import CartHeader from "./components/CartHeader";
import CartList from "./components/CartList.tsx";
import { useCartStore } from "@/store/useCartStore";
import { isEmpty } from "lodash";
import EmptyCart from "./components/EmptyCart.tsx";
import CartSummary from "./components/CartSummary.tsx";
import { Loader2 } from "lucide-react";

const CartPage: React.FC = () => {
  const { handleGetCartItems, cart, isLoading, setSelectedCart, setGroupCart } =
    useCartStore();

  useEffect(() => {
    handleGetCartItems();
    setSelectedCart([]);
    setGroupCart([]);
  }, [handleGetCartItems, setGroupCart, setSelectedCart]);

  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="text-primary-300 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[500px] px-6 py-6">
      <div className="container mx-auto">
        <div className="font-inter mb-3 text-[20px] font-[500] text-black">
          GIỎ HÀNG
        </div>

        {isEmpty(cart) ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="min-w-0 flex-1 space-y-4">
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
