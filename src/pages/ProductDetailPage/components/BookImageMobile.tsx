import TitleSection from "./TitleSection";
import ViewMoreSection from "./ViewMoreSection";
import BookImage from "./BookImage";


const BookImageMobile = () => {
  return (
    <div className="h-fit w-full flex-1 gap-y-4 bg-white py-4 pb-0 md:max-w-100">
      <BookImage/>
      <TitleSection/>
      <ViewMoreSection/>
    </div>
  );
};
export default BookImageMobile;
