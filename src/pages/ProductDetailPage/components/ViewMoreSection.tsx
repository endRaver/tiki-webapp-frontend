import { arrow_right, book_info } from "@/assets/icons/detail_page_icons"

const ViewMoreSection = () => {
    return (
        <div className="flex justify-between border-t border-[#EBEBF0] p-4">
            <div className="flex items-center gap-x-1">
                <img src={book_info} alt="book info" />
                <p className="text-sm">
                    <span className="text-[#808089]">Xem thêm</span> Tóm tắt nội dung
                    sách
                </p>
            </div>
            <img src={arrow_right} alt="arrow right" />
        </div>
    )
}
export default ViewMoreSection