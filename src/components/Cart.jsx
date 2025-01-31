import React, { useContext } from 'react'
import { CartContext } from '../contextApi/context'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { clearCart, remFromCart } from '../utils/cartSlice'

function Cart() {
 
var {cartData,setCartData} = useContext(CartContext)
// var cartData = useSelector((state)=>state.cartSlice.cartData);
// var dispatch = useDispatch()
console.log(cartData);

 const handleClear = ()=>{
//  dispatch(clearCart())
  setCartData([])
  localStorage.setItem("cart",JSON.stringify([]))
  localStorage.setItem("restInfo",JSON.stringify([]))
 }
 const handleRemFromCart = (idx)=>{
    if(cartData.length >0){
      let dummyCartData = [...cartData]
      dummyCartData.splice(idx,1)
      // dispatch(remFromCart())
      setCartData(dummyCartData);
      localStorage.setItem("cart",JSON.stringify(dummyCartData))

    }else handleClear()

      // here we are creating a new refernce 
      cartData.splice(idx,1);//directly updating the state it wont create a new refrence it just updates the items
      setCartData(cartData)// set stae is used to for re rnedinring the comp...
 }
 if(cartData.length<1) return(
   <>
   { localStorage.setItem("restInfo",JSON.stringify([]))}
  <div className='w-full mt-11'>
      <div className='w-[50%] mx-auto flex flex-col items-center gap-5'>
        <img width={276} height={256} src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"/>
        <h1>Your Cart is Empty</h1>
        <p>You can go to home page to view more restaurants</p>
        <Link to="/"><button className='font-bold text-base text-white px-[25px] py-[10px] bg-orange-500 hover:shadow-lg'>SEE RESTAURANTS NEAR YOU</button></Link>
       </div>
  </div>
</>
 )
  let totalPrice = 0;
  
  return (
    <div className='w-full'>
      <div className='w-[50%] mx-auto'>
        {
          cartData.map((item,i)=>{
            console.log(item);
            totalPrice=totalPrice+(item?.defaultPrice||item?.price)/100
            return(
              <>
                <div  className='flex w-full justify-between my-5 p-2'>
                <div className='w-[70%]'>
                  <h1 className="w-full text-3xl font-bold"> {item?.restName}</h1>
                  <h1 className='w-full text-2xl'>{item?.name}</h1>
                  <p className='w-full text-3xl>'> {item?.defaultPrice/100||item?.price/100} </p>
                </div>
                <div className='w-[30%] relative'>
                  <img className='rounded-xl aspect-square' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.imageId}`}/>
                  <button className='w-28 h-8 bg-red-500 text-white font-bold text-base rounded-lg absolute top-[166px] left-9'
                   onClick={()=>(handleRemFromCart(i))}
                   >Remove
                  </button>
                </div>
              </div>

              <hr/>
              </>
            )
          })
        }
        <p>Total-र {Math.floor(totalPrice)}</p>
        <button 
        onClick={()=>{handleClear()}}
        className='w-[100px] h-8 rounded-sm mt-2 bg-green-400 text-white font-bold'>Clear Filter</button>
      </div>
    </div>
  )
}

export default Cart