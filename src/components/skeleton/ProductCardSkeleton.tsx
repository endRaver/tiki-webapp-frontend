const SkeletonCardProduct = () => {
    return (
        <div className="p-4  rounded shadow animate-pulse space-y-2 bg-white h-10 min-h-[567px]">
            <div className="h-60 bg-gray-300 rounded" />       {/* Ảnh giả */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />  {/* Tên sản phẩm giả */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />  {/* Giá sản phẩm giả */}
        </div>

    )
};
export default SkeletonCardProduct;