import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="w-full h-100 flex flex-col justify-center items-center bg-background">
            <div className="mb-6">
                <img className="w-50" src="https://salt.tikicdn.com/ts/brickv2og/3c/7c/9b/1d101c4757843340d812828590283374.png" alt="" />
            </div>
            <p className="mb-6 text-lg ">Trang bạn tìm kiếm không tồn tại</p>
            <Link to="/">
                <button className="w-80 font-medium rounded-sm bg-[#0b74e5] text-white px-10 py-2">Tiếp tục mua sắm</button>
            </Link>
        </div>
    )
}
export default NotFound;