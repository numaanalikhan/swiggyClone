import { info } from 'autoprefixer';
import React from 'react'
import { Link } from 'react-router-dom';

function RestaurantData({restaurantData}) {
  return (
    <div className='w-full grid md:grid-cols-2 px-2  grid-cols-1'>
        {
            restaurantData?.map(({
                card:{
                  card:{
                    info:{
                      id,
                      name,
                      cuisines,
                      costForTwoMessage,
                      cloudinaryImageId,
                      avgRating,
                      sla:{
                        slaString
                      }
                    }
                  }
                }
              })=>{
                let restName = name.replaceAll(" ","-")
                let restId = "rest"+id?.toString(id)
                return (
                    <Link to={`/restaurantMenu/${restName}-${restId}`} key={id} className='bg-white p-2  mx-2 my-1  rounded-2xl  flex justify-between items-center'>
                        {/*image*/}
                        <div className='w-[30%]'>
                         <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`}
                         className='aspect-square object-cover rounded-md'
                         />
                        </div>
                        {/*Information*/}
                        <div className='w-[60%] p-3'>
                          <p className='font-bold text-base'>{name}</p>
                          <div className='flex items-center  gap-1 mt-1'>
                          <i className=" fi-ss-star text-gray-600 text-sm "></i>            
                          <span className='text-gray-600 font-semibold text-sm '>{avgRating} . {slaString} . </span>
                          </div>
                          {cuisines?.map((item,idx)=>{
                            return (
                             cuisines.length<=3 ? <span className='text-xs text-gray-500 font-semibold'>{cuisines.length-1==idx ? `${item}.` :`${item}, `} </span> : <span className={`text-xs text-gray-500 font-semibold`}>{cuisines.length-1==idx ? `${item}.` :`${item}, `}</span>
                            )
                          })}
                        </div>
                    </Link>
                )
              })
        }
    </div>
  )
}

export default RestaurantData