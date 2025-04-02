import { star_fullfill } from "@/assets/icons/home_page_icons";

interface CarouselItemProps {
  brandImage: string;
  brandTitle: string;
  subtitle: string;
  booksImage: string[];
}
const CarouselItem = (props: CarouselItemProps) => {
  const { brandImage, brandTitle, subtitle, booksImage } = props;
  return (
    <main className="flex w-1/2 flex-shrink-0 cursor-pointer flex-row gap-4">
      <img src={brandImage} alt="" />
      <div className="flex flex-col">
        <h1 className="font-bold">{brandTitle}</h1>
        <div className="mt-2 mb-12 flex flex-row">
          <p className="text-gray-400">
            Tài trợ bởi{" "}
            <span className="font-medium text-black">{subtitle}</span> 5/5{" "}
          </p>
          <img src={star_fullfill} alt="" />
        </div>
        <div className="flex flex-row gap-3">
          <img src={booksImage[0]} alt="" />
          <img src={booksImage[1]} alt="" />
          <img src={booksImage[2]} alt="" />
        </div>
      </div>
    </main>
  );
};
export default CarouselItem;
