import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsDiffRestAction } from '../utils/toogleSlice';
import { clearCart } from '../utils/cartSlice';

function IsDiffRest() {
    const {isDiffRestToogle} = useSelector((state)=>state.toogleSlice)
    const dispatch = useDispatch()
    const handleNo = () => {
        dispatch(setIsDiffRestAction())
      };
    
      const handleAfresh = () => {
        dispatch(clearCart());
        handleNo();
      };
  return (
    <div
    className={`w-[520px] h-[204px] p-8 shadow-md left-[30%] fixed bg-white z-10 
                duration-700 ease-in-out transform  bottom-1 ${ isDiffRestToogle ? "-translate-y-[15%]" : "translate-y-[105%]"} }`}
  >
    <p className="font-bold text-xl">Items already in the cart</p>
    <p className="text-base mt-2">
      Your cart contains items from another restaurant. Would you like to
      reset your cart for adding items from this restaurant?
    </p>
    <div className="flex justify-between items-center mt-2 gap-5">
      <button
        onClick={handleNo}
        className="border-[#1BA672] border-2 flex-1 p-3 text-[#1BA672] hover:shadow-lg hover:scale-[1.01] ease-in-out"
      >
        NO
      </button>
      <button
        onClick={handleAfresh}
        className="border-[#1BA672] border-2 flex-1 p-3 bg-[#1BA672] text-white font-bold hover:shadow-lg hover:scale-[1.01] ease-in-out"
      >
        YES, START AFRESH
      </button>
    </div>
  </div>
  )
}

export default IsDiffRest