import { star_fullfill } from "@/assets/icons/home_page_icons";

interface CarouselItemProps {
  index: number;
  brandImage: string;
  brandTitle: string;
  subtitle: string;
  booksImage: string[];
}
const CarouselItem = ({
  index,
  brandImage,
  brandTitle,
  subtitle,
  booksImage,
}: CarouselItemProps) => {
  return (
    <div
      className={`${index > 0 && index % 2 === 0 && "-ml-3"} flex w-[calc(50%-6px)] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-black/5 bg-white`}
    >
      <div
        className="aspect-square w-full flex-1"
        style={{
          backgroundImage: `url(${brandImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="flex flex-2 flex-col justify-between p-4 text-sm">
        <div className="">
          <span className="text-xl font-medium">{brandTitle}</span>

          <div className="mt-1 flex items-center gap-1 text-neutral-600">
            <div className="flex items-center gap-1">
              <span className="">Tài trợ bởi</span>
              <span className="truncate font-medium text-black">
                {subtitle}
              </span>
              <span>5/5</span>
            </div>

            <img src={star_fullfill} alt="star" className="mb-1 size-5" />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <img src={booksImage[0]} alt="" />
          <img src={booksImage[1]} alt="" />
          <img src={booksImage[2]} alt="" />
        </div>
      </div>
    </div>
  );
};
export default CarouselItem;
