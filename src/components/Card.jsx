import axios from 'axios'
import  {useState,useEffect} from 'react'
function Card ({value,setValue}) {
    useEffect(()=>{
        axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        .then((res)=>{
            setData(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            console.log(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            
        })
      },[])
      var [data,setData] = useState([])

  return (
    <div>
         <div
         className='flex duration-1000 mt-4  w-full gap-6'
         style={{transform:`translateX(-${(value >=430 ?"":value)}%)`}}  >
            {
                data?.map((item)=>{
                    const {id,cloudinaryImageId,name,avgRating,sla,cuisines}= item.info
                    return(
                        <div key={id}>
                            <img 
                            className=' min-w-[222px] h-[148px] object-cover rounded-xl'
                             src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                            />
                            <p>{name}</p>
                            <div className='flex items-center'>
                                <div className='w-5 h-5 rounded-full bg-green-500 flex justify-center items-center'>
                                    <i className=" text-sm fi fi-rr-star"></i>
                                    </div>
                                    <div className='mb-1'>
                                        <span>{avgRating}</span>
                                        <span>{sla.slaString}</span>
                                    </div>
                            </div>
                                        <p>{cuisines.join(",").split(0,6)}...</p>
                        </div>
                    )
                })
            }
        </div>
    </div>

  )
}

export default  Card;
