import { useProductStore } from "@/store/useProductStore";

interface CategoryItemProps {
  image: string;
  nameItem?: string;
}
const CategoryItem = (props: CategoryItemProps) => {
  const { image, nameItem } = props;
  const { handleGetProductByCategory } = useProductStore();
  
  const filterByCategory = () => {
    if(nameItem)
    handleGetProductByCategory(nameItem);
  };

  return (
    <button onClick={() => filterByCategory()}>
      <div className="mb-2.5 flex flex-col items-center justify-between gap-2 duration-300 hover:opacity-80">
        <img  src={image} alt="" className="mx-[42px] size-[88px] rounded-full" />
        <span>{nameItem}</span>
      </div>
    </button>
  );
};
export default CategoryItem;
