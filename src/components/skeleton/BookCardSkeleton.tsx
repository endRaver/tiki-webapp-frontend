const BookCardSkeleton = () => {
    return (
        <div className="flex items-center animate-pulse h-[230px] w-full flex-col gap-y-2 rounded-lg">
            <div className="flex w-full justify-center">
                <div className="flex h-32.5 w-full justify-center bg-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="h-3.5 rounded-lg bg-gray-200"></div>
                <div className="h-3.5 w-1/2 rounded-lg bg-gray-200"></div>
            </div>
        </div>

    )
};
export default BookCardSkeleton;