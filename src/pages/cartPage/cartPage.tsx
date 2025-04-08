import React from 'react';
import CartList from './components/CartList';
import FreeGiftList from './components/FreeGiftList';
import AddOnList from './components/AddOnList';
import CartSummary from './components/CartSummary';

const CartPage: React.FC = () => {
    return (
        <div className="bg-background min-h-screen px-8 pt-6 pb-2">
            <div className="lg:px-10">
                <div className="text-[20px] font-inter font-bold mb-[12px]">
                    GIỎ HÀNG
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Left Section: Cart List, Free Gift List, Add-On List */}
                    <div className="flex-1 space-y-4 min-w-0 mr-5">
                        {/* Cart List Section */}
                        <div className="">
                            <CartList />
                        </div>

                        {/* Free Gift List Section */}
                        <div className="rounded bg-white px-4 pt-4 shadow">
                            <h4 className="mb-4 text-lg font-bold text-gray-800">Quà tặng miễn phí</h4>
                            <FreeGiftList />
                        </div>

                        {/* Add-On List Section */}
                        <div className="rounded bg-white px-4 pt-4 shadow">
                            <AddOnList />
                        </div>
                    </div>

                    {/* Right Section: Cart Summary */}
                    <div className="w-full lg:w-[340px] min-w-[340px] space-y-3">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;