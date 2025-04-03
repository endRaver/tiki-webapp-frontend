import { Link } from "react-router-dom";

interface CategoryItemProps {
  image: string;
  nameItem: string;
}
const CategoryItem = (props: CategoryItemProps) => {
  const { image, nameItem } = props;
  return (
    <Link to="/">
      <div className="mb-2.5 flex flex-col items-center justify-between gap-2 duration-300 hover:opacity-80">
        <img src={image} alt="" className="mx-[42px] size-[88px]" />
        <span>{nameItem}</span>
      </div>
    </Link>
  );
};
export default CategoryItem;
