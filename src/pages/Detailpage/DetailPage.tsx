import BookImage from "./componets/BookImage"
import Payment from "./componets/Payment"

const Detailpage = () =>{
    return(
        <div className="bg-gray-200 p-8 flex justify-between">  
        <BookImage/>
        <Payment/>
        </div>
    )
}

export default Detailpage