import { arrow_right, check_product, return_money, return_product } from "@/assets/icons/detail_page_icons"

const PurchaseAssurance = () => {
    return (
        <div className="p-4 bg-white rounded-lg flex flex-col">
            {/* Tiêu đề và nút mũi tên */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">An tâm mua sắm</h2>
                <button className="text-gray-500 focus:outline-none">
                    <img src={arrow_right} alt="arrow-right" />
                </button>
            </div>

            {/* Các mục an tâm mua sắm */}
            <div className="flex flex-col space-y-4">
                {/* Mục 1 */}
                <div className="flex items-center border-b py-1 border-[#EBEBF0] gap-x-1">
                    <img src={check_product} alt="check product" />
                    <p className="text-sm">Được đổi kiện khi nhận hàng</p>
                </div>

                {/* Mục 2 */}
                <div className="flex items-center border-b py-1 border-[#EBEBF0] gap-x-1">
                    <img src={return_money} alt="return money" />
                    <p className="text-gray-700 text-sm"> <span className="font-medium">Được hoàn tiền 200%</span> nếu là hàng giả.</p>
                </div>

                {/* Mục 3 */}
                <div className="flex items-start flex py-1 gap-x-1">
                    <img src={return_product} alt="return product" />
                    <div>
                        <p className="text-sm">
                            Đổi trả miễn phí trong 30 ngày. Được đổi ý.
                        </p>
                        <p className="text-sm underline">Chi tiết</p>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default PurchaseAssurance