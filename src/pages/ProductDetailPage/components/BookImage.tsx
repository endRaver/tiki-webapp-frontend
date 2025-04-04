import { arrow_right, book_info } from "@/assets/icons/detail_page_icons";
import { useState } from "react";

// import products from "@/assets/fakeData";

const BookImage = () => {
  const [isFront, setIsFront] = useState(true);
  const [isFrontImg, setIsFrontImg] = useState(false);

  return (
    <div className="h-fit max-w-100 flex-1 gap-y-4 rounded-lg bg-white py-4 pb-0">
      <div className="mb-4 px-4">
        {/* Main Image */}
        <div className="mb-2 flex justify-center rounded-lg border border-gray-300">
          {isFront ? (
            <>
              <img
                src="https://salt.tikicdn.com/cache/750x750/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png.webp"
                alt="ChatGPT Thực Chiến"
                className="w-92 rounded-lg"
              />
            </>
          ) : (
            <>
              <img
                src="https://salt.tikicdn.com/cache/750x750/ts/product/a1/61/c8/0ffd6d2fd86a19ea9b5f2048fc2d0e5d.png.webp"
                alt="ChatGPT Thực Chiến"
                className="w-92 rounded-lg"
              />
            </>
          )}
        </div>

        {/* Thumbnail Section */}
        <div className="flex gap-2">
          <img
            src="https://salt.tikicdn.com/cache/100x100/ts/product/17/4a/65/b4765d60127ee4cccf8fd551633fafd4.png.webp"
            alt="Thumbnail 1"
            className={`w-13.5 cursor-pointer rounded-sm ${isFrontImg ? "border-2 border-[#0A68FF]" : "border border-[#EBEBF0]"}`}
            onClick={() => setIsFrontImg(true)}
            onMouseOver={() => setIsFront(true)}
          />
          <img
            src="https://salt.tikicdn.com/cache/100x100/ts/product/a1/61/c8/0ffd6d2fd86a19ea9b5f2048fc2d0e5d.png.webp"
            alt="Thumbnail 2"
            className={`w-13.5 cursor-pointer rounded-sm ${isFrontImg ? "border border-[#EBEBF0]" : "border-2 border-[#0A68FF]"}`}
            onClick={() => setIsFrontImg(false)}
            onMouseOver={() => setIsFront(false)}
          />
        </div>
      </div>

      {/* View More Section */}
      <div className="flex justify-between border-t border-[#EBEBF0] p-4">
        <div className="flex items-center gap-x-1">
          <img src={book_info} alt="" />
          <p className="text-sm">
            <span className="text-[#808089]">Xem thêm</span> Tóm tắt nội dung
            sách
          </p>
        </div>
        <img src={arrow_right} alt="" />
      </div>
    </div>
  );
};
export default BookImage;
