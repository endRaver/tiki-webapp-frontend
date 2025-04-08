// components/CartList.tsx
import React, { useState, useEffect } from 'react';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartDiscount from './CartDiscount';

const cartItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/29036600/pexels-photo-29036600/free-photo-of-ch-ng-sach-co-t-di-n-ca-phe.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    name: 'Bộ 2 lọ Sữa Bột Nestlé NAN OPTIPRO PLUS 4 800g/lọ vỹ 5HMO Giúp bé tự tin',
    originalPrice: 880000,
    discountedPrice: 790000,
    discount: 10,
    quantity: 2,
  },
  {
    id: 2,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Một Thoáng Ta Rực Rỡ Ở Nhân Gian',
    originalPrice: 94500,
    discountedPrice: 85150,
    discount: 10,
    quantity: 7,
  },
  {
    id: 3,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Một Thoáng Ta Rực Rỡ Ở Nhân Gian',
    originalPrice: 94500,
    discountedPrice: 85150,
    discount: 10,
    quantity: 7,
  },
];

const CartList: React.FC = () => {
  const [items, setItems] = useState(cartItems);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Calculate the total cart value and apply discount automatically
  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + item.discountedPrice * item.quantity,
      0
    );
    // Apply a 5K discount if total is >= 139K (as per the image)
    if (total >= 139000) {
      setDiscountAmount(5000);
    } else {
      setDiscountAmount(0);
    }
  }, [items]);

  const handleIncrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  return (
    <div className="">
      <CartHeader onClearCart={handleClearCart} />
      {items.length === 0 ? (
        <p className="p-4 text-center text-sm space-x-4">Giỏ hàng trống</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              image={item.image}
              name={item.name}
              originalPrice={item.originalPrice}
              discountedPrice={item.discountedPrice}
              discount={item.discount}
              quantity={item.quantity}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
          <CartDiscount
            hasDiscount={discountAmount > 0}
            discountAmount={discountAmount}
          />
        </>
      )}
    </div>
  );
};

export default CartList;