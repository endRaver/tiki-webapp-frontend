import React, { useState } from 'react';

const CouponSection: React.FC = () => {
  const [isCouponActive, setIsCouponActive] = useState(false);

  return (
    <div className="space-y-4 rounded bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold">Khuyến mãi</h4>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
          <span>Có thể chọn 2</span>
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="relative flex items-center">
        <div className="relative z-10 flex w-full items-center gap-4 p-2">
          <div className="size-11 overflow-hidden rounded-lg">
            <svg
              className="h-full w-full text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="flex flex-1 items-center justify-between gap-1">
            <span className="text-[13px] font-medium text-neutral-100">
              Giảm 25K
            </span>

            <div className="me-1 flex items-center gap-1">
              <svg
                className="h-4 w-4 text-blue-500 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <button
                onClick={() => setIsCouponActive(!isCouponActive)}
                className="cursor-pointer rounded bg-[#017FFF] px-3 py-1 text-xs font-medium text-white"
              >
                {isCouponActive ? "Áp Dụng" : "Bỏ chọn"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="flex cursor-pointer items-center gap-2">
        <svg
          className="h-5 w-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span className="text-primary-200 text-sm">Chọn hoặc nhập mã khác</span>
        <svg
          className="h-4 w-4 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default CouponSection;