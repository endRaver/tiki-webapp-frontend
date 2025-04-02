
interface CategoryItemProps{
    image:string,
    nameItem:string,
}
const CategoryItem = (props:CategoryItemProps) => {
    const {image,nameItem}=props;
    return (
        <div className="flex flex-col justify-between px-[40px] py-[12px] cursor-pointer ">
            <img src={image} alt="" className="hover:bg-gray-100"/>
            <span>{nameItem}</span>
        </div>  
    );

}
export default CategoryItem;