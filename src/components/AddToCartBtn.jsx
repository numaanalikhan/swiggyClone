import { addToCart } from "../utils/cartSlice";
import { useContext } from "react";
import { RestInfo } from "../contextApi/context";
import { useDispatch, useSelector } from "react-redux";
import { setIsDiffRestAction } from "../utils/toogleSlice";




function AddToCartBtn({info,restInfo}) {
    var getLocalStorageRestInfo =  useSelector((state)=>{ return state.cartSlice.restInfo })
    var cartData = useSelector((state)=>{return state.cartSlice.cartData});
    const dispatch = useDispatch()


     const handleAddToCart = ()=>{
        var isAddedToCart = cartData?.find(item=>item?.id === info?.id)
        if(!isAddedToCart){
        
            if(getLocalStorageRestInfo?.name===restInfo?.name || getLocalStorageRestInfo.length===0){
              dispatch(addToCart({info,restInfo}))
            }
            else {
              dispatch(setIsDiffRestAction())
            }
        }else{
          alert(`item already existed`)
        }
      }
  return (
    <button 
    onClick={()=>{handleAddToCart()}}              
    className='text-green-500 bg-white font-bold text-xs md:text-lg  rounded-lg absolute  px-[20%] py-[1%] md:left-[18%] left-[12%] md:top-[85%]'>Add</button>

  )
}

export default AddToCartBtn