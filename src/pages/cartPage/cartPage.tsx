// CartPage.tsx
import { useState } from "react";
import CartHeader from "./components/CartHeader";
import CartList from "./components/CartList";
import AddOnList from "./components/AddOnList";
import CartSummary from "./components/CartSummary";

const CartPage: React.FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [itemCount, setItemCount] = useState(9); // Initial item count based on your data

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  const handleClearCart = () => {
    // This will be passed to CartList to trigger the modal
  };

  return (
    <div className="bg-background min-h-screen px-6 pt-6 pb-2">
      <div className="lg:px-10">
        {" "}
        {/* Add padding-top to account for the fixed header */}
        <div className="font-inter text-[20px] font-[500] text-black">
          GIỎ HÀNG
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Left Section: Cart List, Free Gift List, Add-On List */}
          <div className="mr-5 min-w-0 flex-1 space-y-4">
            {/* Cart List Section */}
            <div>
              <CartHeader
                onClearCart={handleClearCart}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                itemCount={itemCount}
              />
              <CartList
                onClearCart={handleClearCart}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                itemCount={itemCount}
              />
            </div>

            {/* Add-On List Section */}
            <div className="rounded bg-white px-4 pt-4 shadow">
              <AddOnList />
            </div>
          </div>

          {/* Right Section: Cart Summary */}
          <div className="w-full min-w-[340px] space-y-3 lg:w-[340px]">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
