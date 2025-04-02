import products from "@/assets/fakeData";
const BookImage = () => {
    return (
        <div className="w-[400px] flex flex-col p-[16px] border rounded-lg"> 
            <div className="flex flex-col gap-y-[8px]">
                <div className="border rounded-lg border-gray-200">
                    <img src={products[0].images[0].base_url} alt="" className="" />
                </div>
                <div className="h-[54px] flex">
                    <a href="" className="h-[54px] w-[54px] flex items-center justify-center border border-solid rounded-lg border-gray-200">
                        <img className="h-[47px] w-[47px] " src={products[0].images[0].small_url} alt="" />
                    </a>
                </div>
            </div>
            <div className="flex justify-between items-center px-[16px] pt-[12px] border-t border-gray-200">
                <p><span className="text-gray-400">Xem thêm</span> Tóm tắt nội dung sách</p>
            </div>
        </div>
    )
}
export default BookImage;