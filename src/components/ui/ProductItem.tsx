
interface ProductItemProps{
    image:string
}
const ProductItem=(props:ProductItemProps) =>{
    const {image}=props;
    return (
        <img src={image} alt="" />
    );
}
export default ProductItem