import BookImage from "./componets/BookImage";
import Payment from "./componets/Payment";

const Detailpage = () => {
  return (
    <div className="flex justify-between bg-gray-200 p-8">
      <BookImage />
      <Payment />
    </div>
  );
};

export default Detailpage;
