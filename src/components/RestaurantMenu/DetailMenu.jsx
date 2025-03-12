import { useContext, useState } from "react";

import AddToCartBtn from "../AddToCartBtn";

import { novVeg, veg } from "../../Constants/data";
import { RestInfo } from "../../contextApi/context";

function DetailMenu ({ itemCards }) {
  var {restInfo} = useContext(RestInfo);
      
      return itemCards?.map((item, i) => {
        var {card:{info}} = item
        const { name,
                price,
                imageId,
                defaultPrice,
                itemAttribute: { vegClassifier },
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
             } = info
        
      
      return (
        <div key={i}>
          <div
            className="flex items-center justify-between w-full h-auto  mb-8 mt-2"
          >
            <div className="w-[70%] min-h-full ">
              
              <img
                className="w-4"
                src={vegClassifier === "VEG" ? veg : novVeg}
                alt={name}
              />
              <p className="font-bold">{name}</p>
              <p className="font-bold">
                र {defaultPrice / 100 || Math.floor(price / 100)}
              </p>
              <span className="flex items-center gap-1 text-sm mb-2">
                <i className="fi fi-ss-star my-2 text-sm"></i>
                <span className="">
                  <span className="font-bold text-green-700">{rating}</span>(
                  {ratingCountV2})
                </span>
              </span>
  
             <Description item={item}/>
             
            </div>
  
            <div className="w-[13%] relative  ">
              {imageId ? (
                <img
                  className=" aspect-square  object-center rounded-2xl"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                />
              ) : (
                ""
              )}
              <AddToCartBtn  info={info} restInfo={restInfo}/>
         
            </div>
            
          </div>
          <hr className="border mb-8  " />
        </div>
      );
    });
  }
  
  function Description ({item}){
    var {card:{info:{description}}} = item
  
    var [isMore, setIsMore] = useState(true);
    var toogleMfore = () => {
      setIsMore(!isMore);
    };
       
    var itemDescription = description ? description :"baigan"
  
    return(
       <div className="w-full h-full">
      {
          itemDescription.length <= 145 ?
          (<p>{itemDescription}</p> ):
           
               (
          <div className="h-full "
          onClick={() => {
            toogleMfore();
          }}
              >
          <span
            className={`text-slate-600 ` + (isMore ? "line-clamp-2" : "")}
          >
            {itemDescription}...
          </span>
          <button className="cursor-text text-slate-600 ">
            {isMore ? "more" : "less"}
          </button>
              </div>
       )
      }
      </div>
    )
  }

  export default DetailMenu