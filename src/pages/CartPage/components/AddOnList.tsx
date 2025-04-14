import React, { useRef, useState, useEffect } from 'react';
import AddOnItem from './AddOnItem';

// Dữ liệu giả lập (bao gồm rating và deliveryDate)
const addOnItems = [
  {
    id: 1,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Vớng Da Quang Nuan Nuan',
    originalPrice: 214000,
    discountedPrice: 214000,
    discount: 0,
    rating: 5,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 2,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Giày cho bé gái phong cách dễ thương',
    originalPrice: 203633,
    discountedPrice: 183270, // Áp dụng giảm giá 10%
    discount: 10,
    rating: 4,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 3,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Bột ăn dặm dinh dưỡng Sữa An',
    originalPrice: 155000,
    discountedPrice: 155000,
    discount: 0,
    rating: 5,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 4,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Dầu Gội Bé Bầu Em Bé Babymac Shampoo',
    originalPrice: 232800,
    discountedPrice: 209520, // Áp dụng giảm giá 10%
    discount: 10,
    rating: 4,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 5,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Bộ Phù Kiện Tóc Twinkle Star Clever Hippo',
    originalPrice: 111000,
    discountedPrice: 111000,
    discount: 0,
    rating: 5,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 6,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Bột ăn dặm dinh dưỡng Sữa Hoa Bắp Hip',
    originalPrice: 155000,
    discountedPrice: 139500, // Áp dụng giảm giá 10%
    discount: 10,
    rating: 4,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 7,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Bột ăn dặm dinh dưỡng Sữa Hoa Bắp Hip',
    originalPrice: 155000,
    discountedPrice: 139500, // Áp dụng giảm giá 10%
    discount: 10,
    rating: 4,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
  {
    id: 8,
    image: 'https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png',
    name: 'Bột ăn dặm dinh dưỡng Sữa Hoa Bắp Hip',
    originalPrice: 155000,
    discountedPrice: 139500, // Áp dụng giảm giá 10%
    discount: 10,
    rating: 4,
    deliveryDate: 'Giao thứ 7, 12/04',
  },
];

const AddOnList: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Số lượng sản phẩm hiển thị cùng lúc (5 sản phẩm)
  const itemsPerPage = 5;
  // Chiều rộng của mỗi sản phẩm (cố định 195.33px)
  const productWidth = 195.33;

  const updateButtonVisibility = () => {
    setCanScrollLeft(currentIndex > 0);
    // Adjust the condition to account for scrolling one item at a time
    setCanScrollRight(currentIndex < addOnItems.length - itemsPerPage);
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      // Scroll by the width of one product at a time
      scrollRef.current.scrollTo({
        left: index * productWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1; // Move one product to the left
      scrollToIndex(newIndex);
    }
  };

  const scrollRight = () => {
    if (currentIndex < addOnItems.length - itemsPerPage) {
      const newIndex = currentIndex + 1; // Move one product to the right
      scrollToIndex(newIndex);
    }
  };

  useEffect(() => {
    updateButtonVisibility();
  }, [currentIndex]);

  return (
    <div className="">
      {/* White background wrapper for the entire section */}
      <div className="bg-white p-1 rounded-lg relative">
        <h2 className="text-x font-bold font-inter mb-2">Sản phẩm mua kèm</h2>
        <div className="relative">
          {/* Scrollable product list */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden scrollbar-hide snap-x snap-mandatory"
          >
            {addOnItems.map((item) => (
              <div
                className="flex-shrink-0 snap-start"
                style={{ width: `${productWidth}px` }}
                key={item.id}
              >
                <AddOnItem
                  image={item.image}
                  name={item.name}
                  originalPrice={item.originalPrice}
                  discountedPrice={item.discountedPrice}
                  discount={item.discount}
                  rating={item.rating}
                  deliveryDate={item.deliveryDate}
                />
              </div>
            ))}
          </div>

          {/* Left arrow (Previous) - Show only if can scroll left */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
              style={{ backgroundColor: 'rgb(10, 104, 255)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgb(8, 82, 204)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgb(10, 104, 255)')
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Right arrow (Next) - Show only if can scroll right */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
              style={{ backgroundColor: 'rgb(10, 104, 255)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgb(8, 82, 204)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgb(10, 104, 255)')
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOnList;