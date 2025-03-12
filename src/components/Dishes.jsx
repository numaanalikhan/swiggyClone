import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../utils/cartSlice';
import { veg,novVeg } from '../Constants/data';
import AddToCartBtn from './AddToCartBtn';



function Dishes({dishes}) {
 const dispatch = useDispatch()
 const getLocalStorageRestInfo = useSelector((state)=>state.cartSlice.restInfo)
  const handleClick = (info,restInfo)=>{
    console.log(getLocalStorageRestInfo);
    
    if(getLocalStorageRestInfo.id==restInfo.id){
      dispatch(addToCart({info,restInfo}))
    }else{
      alert('ordering from other restaurant')
      dispatch(clearCart())
      dispatch(addToCart({info,restInfo}))
    }
  }
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2'>
    {

          dishes?.map((dish) => {
            let {
                card: {
                    card: { info, restaurant },
                },
            } = dish;
            let { id, isVeg = 0, name, price, imageId = "" } = info;
            
            let {info:restInfo} = restaurant
            let {id:restId,name:restName,avgRating,sla:{slaString}} = restInfo
    
            return (
                <div key={id} className='bg-white  p-3 my-3 mx-2 rounded-2xl '>
                  {/*restaurant wrapper*/}
                  <div className='flex items-center justify-between'>
                     <div>
                        <p className='text-sm font-bold'>By {restName}</p>
                        <div className='flex gap-1 items-center '>
                        <p className='mt-0'><i className="fi fi-ss-star text-xs"></i></p>
                        <span className='font-semibold text-gray-600 text-xs'>{avgRating} . </span>
                        <span className='font-semibold text-gray-600 text-xs'>{slaString}</span>
                        </div>
                     </div>
                     <div>
                     <i className="fi fi-tr-arrow-small-right text-3xl text-gray-400 "></i>            
                    </div>
                  </div>
                  <hr className='border-dotted mt-3 border-2'/>

                  {/*dish wrapper */}
                  <div className='w-full flex justify-between my-6 f'>
                    <div className='w-[50%]'>
                    <img className='w-4 h-4' src={isVeg ? veg :novVeg}/>
                    <p className='font-bold text-base'>{name}</p>
                    <span className='font-semibold'>₹</span><span className='font-bold'>{price/100}</span>
                    </div>
                    <div className='w-[40%]  relative'>
                      {imageId ? <img className='aspect-square object-cover rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`}/> :<img src='fallBackImg.jpg' className='w-[154px] h-[144px] object-cover rounded-xl'/>}
                      <AddToCartBtn info={info} restInfo={restInfo}/>
                    </div>
                  </div>
                </div>
        )
    })
    }
    </div>
  )
}

export default Dishes