import React from 'react'
import { Link } from 'react-router-dom';

function Card(info) {
  const {id,cloudinaryImageId,aggregatedDiscountInfoV3,avgRating,sla,cuisines,locality,name,link,width} = info;
  return (
     <Link to={`/restaurantMenu/${link.split("/")[5]}`}>  
       <div key={id} className='hover:scale-90 duration-300 mt-5 mr-4'
                     style={{width:`${width}px`}}>
              <div  className={` h-[160px] relative`}
                    style={{width:`${width}px`}}
              >
                  <img
                    className=" w-full h-full object-cover rounded-2xl "
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                  />
                    <div className="w-full h-full absolute top-0 bg-gradient-to-t from-4% from-black to-50% rounded-2xl"></div>
                   <p className="font-bold ml-4 mr-4 mb-2 text-white absolute bottom-0">{
                    aggregatedDiscountInfoV3?.header && aggregatedDiscountInfoV3?.subHeader ? (aggregatedDiscountInfoV3?.header + " " + aggregatedDiscountInfoV3?.subHeader):""
                    }</p>
                </div>
                <div className='ml-4 mt-2  '>
                  <h1 className='font-bold w-full line-clamp-1 text-[14px]'>{name}</h1>
                  <p className='flex items-center gap-2 text-[14px]'>
                    <i className=" fi fi-ss-circle-star text-green-500">  </i>
                    <span className='mb-1'>{avgRating} </span>
                    <span className='mb-1 font-semibold '>{sla?.slaString}</span>
                  </p>
                  <p className='text-gray-700 text-[14px] font-semibold line-clamp-1'>{cuisines.join(", ")}</p>
                  <p className='text-gray-700 text-[14px] font-semibold'>{locality}</p>
                  </div>
              </div>
     </Link>
  )
}

export default Card