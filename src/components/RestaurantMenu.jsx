import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function RestaurantMenu() {
  var params = useParams();
  var id = params.id.split("-").at(-1).slice(4);

  var [restInfo, setRestInfo] = useState([]);
  var [restOffers, setRestOffers] = useState([]);
  var [restMenu, setRestMenu] = useState([]);
  var [value, setValue] = useState(0);
  var [currIdx,setCurrIdx] = useState(0)
  useEffect(() => {
    axios
      .get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.406498&lng=78.47724389999999&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`)
      .then((res) => {
        // console.log( res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR);

        setRestInfo(res?.data?.data?.cards[2]?.card?.card?.info);
        setRestOffers(res?.data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
       let filterRestMenu = (res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((item)=>{
        return item?.card?.card?.itemCards || item?.card?.card?.categories
       })
       console.log(filterRestMenu)
        setRestMenu(filterRestMenu);
       // is mai aisa array hia jo ka itemsCard ko store karta
      });
  }, []);
  const handlePrev = ()=>{
    // console.log("handle prev fun is executed")
    setValue(prevStateValue => prevStateValue -101)
  }
  const handleNext = ()=>{
    // console.log("handleNext function is executed");
    setValue(prevStateValue => prevStateValue +101)
  }
const toogleFun = (index)=>{
  console.log("toogle fun id called");
  console.log("your are index number" + index);
  setCurrIdx(index === currIdx ? null : index)
}

  return (
    <div className="w-full mt-6">
      <div className="w-[62%] mx-auto ">
        
        <p className="text-gray-400 text-[10px] font-semibold">
          <Link to="/">
            <span className="hover:text-gray-500">Home</span>
          </Link>{" "}
          / <span className="hover:text-gray-500">{restInfo.city}</span> /{" "}
          <span className="text-gray-500">{restInfo.name}</span>
        </p>
        <h1 className="font-bold text-xl mt-6">{restInfo.name}</h1>

       <RestInfoCard {...restInfo}/>
       <RestOffersCard handleNext={handleNext} handlePrev={handlePrev} value={value} restOffers={restOffers}/>

       <p className="text-center mt-12">Menu</p>
       <div className="relative w-full h-[48px] mt-6 mb-6 ">
          <input 
          type="text" placeholder="Search for dishes" 
          className="relative w-full h-full placeholder:text-center placeholder:font-bold placeholder:text-black bg-gray-200 rounded-xl outline-none"/>
          <i className="fi fi-rr-search absolute bottom-3 right-4"></i>
        </div>
        <div className="flex items-center gap-4 pl-4">
        <div>Veg</div>
        <div>nonVeg</div>
        <div>BestSeller</div>
        <div>Guiltfree</div>
        </div>
        <hr className="mt-4 border"/>

        <div>
          <div className="flex items-center justify-between mt-6 pl-2">
            <h1 className="text-black font-bold ">Top Picks</h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center  "><i className="fi fi-rr-arrow-small-left"></i></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center  "><i className="fi fi-rr-arrow-small-right"></i></div>
            </div>
          </div>
          <div>
          
          </div>
          <div>
            
          </div>
        </div> 
        <hr/>


              {//        ......................accordian part...........................
              }        



        <div>
        {
          restMenu.map((item,idx)=>{
            var {card:{card}}=item
            return(
              <>
                <MenuCard card={card} idx={idx}/> 
              </>
            )
          })
        }
        </div>      
        

       


      </div>
    </div>
  );
}


function RestInfoCard ({avgRatingString,totalRatingsString,costForTwoMessage,cuisines,sla,locality}){
  // console.log(avgRatingString,totalRatingsString,costForTwoMessage,cuisines,sla?.slaString,locality)
  return(
  <>
  <div className=" w-full h-[170px] bg-gradient-to-t from-slate-200/70 rounded-3xl mt-4 px-4 pb-4">
<div className="w-full h-full bg-white rounded-3xl p-4 border">
  <div className="flex gap-2 items-center font-bold ">
    <i className="fi fi-ss-circle-star text-green-500 mt-1"></i>
    <span>{avgRatingString}</span>
    <span>({totalRatingsString})</span>
    <span>{costForTwoMessage}</span>
  </div>
  <p className="text-[#F55205] font-bold pl-2 underline ">
    {cuisines?.join(", ")}
  </p>
<div className=" pl-3 mt-2 flex items-center gap-4 ">
 
    <div className="w-[8px] flex flex-col items-center">
      <div className="w-[8px] h-[8px] rounded-full bg-gray-300"></div>
      <div className="w-[2px] h-[32px] bg-gray-300"></div>
      <div className="w-[8px] h-[8px] rounded-full bg-gray-300"></div>
    </div>
    <div className="">
      <p className="mb-3 font-semibold flex gap-4 ">Outlet <span className="text-gray-400  ">  {locality}</span></p>
      <p className="font-bold">{sla?.slaString.replace("MINS","mins")}</p>
    </div>
</div>

</div>
</div>
  </>)
}
function RestOffersCard ({handleNext,handlePrev,value,restOffers}){
  return(
  <div className="w-full mt-12">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl ">Deals for You</h1>
                <div className="flex items-center gap-2">
                  <div onClick={()=>{
                    handlePrev()
                  }} className={`cursor-pointer w-8 h-8  rounded-full flex items-center justify-center `+(value <=0 ? "bg-slate-100" : "bg-slate-300")}><i className={`text-2xl mt-1 fi fi-rr-arrow-small-left ` + (value <=0 ? "text-slate-300" :"text-black")}></i></div>
                  
                  <div onClick={()=>{handleNext()}}
                     className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center `+(value >=303 ? "bg-slate-100" : "bg-slate-300")}><i className={`text-2xl mt-1 fi fi-rr-arrow-small-right ` +(value >= 303 ? "text-slate-300" : "text-black")}></i></div>
                </div>
              </div>
              <div  
              className="flex gap-4 mt-4 overflow-hidden ">
              {
                restOffers?.map((item)=>{
                  var {restId,offerLogo,header,description}=item.info
                  return(
                <div  
               style={{transform:`translateX(-${value <=303 ? value : ""}%)`}}
                key={restId} className="min-w-[328px] border rounded-2xl flex gap-4 px-2 py-2 duration-1000">
                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/${offerLogo}`}/>
                  <div className="w-full">
                      <h1 className="font-extrabold text-[16px]">{header}</h1>
                      <p className="text-[13px] font-bold text-gray-500">{description}</p>
                  </div>
                </div>
                  )
                })
              }
              </div>
        </div>
  )
}




function MenuCard ({card}){
  // var {tit}=categories
  let isOpenCategory = false
  if(card["@type"]){
    isOpenCategory= true;
  }
  var [isOpen,setIsOpen] = useState(isOpenCategory);
  const toggleArrow = ()=>{
    return(
      setIsOpen(prevStateValue=>!prevStateValue)
    )
  }
  if (card?.itemCards){
    var {title,itemCards} = card
    return(
      <>
      <div className="flex justify-between   py-4 items-center cursor-pointer  bg-white w-full"
      onClick={()=>{toggleArrow()}}
      >
          <span className={`font-bold text-pink-400 text-`+(card["@type"]?"xl":"sm")}>{title} ({itemCards.length})</span>
          <i className={`text-2xl font-bold text-gray-800 fi fi-rs-angle-small-`+(isOpen ? "up" : "down")}></i>
        </div>
        {isOpen &&<DetailMenu itemCards={itemCards}/>}    
         <hr className={"my-2 border-"+(card["@type"]?"[10px]":"[4px]")}/>
        </>
    )
  }
 else{
   var {title,categories} = card
   return(
    <div className="bg-white w-full  ">
        <h1 className="font-bold text-xl">{title} </h1> 

          {
            categories?.map((item)=>{
              return(
                  <>
                    <MenuCard card={item}/>
                  </>
            )
            })
          }
                  </div>    

   )
 }
}
function DetailMenu ({itemCards}){
  return(
    <div className="bg-white w-full">
   {
    itemCards?.map((item,i)=>{
      const {card:{info:{name,imageId,defaultPrice,itemAttribute:{vegClassifier},ratings:{aggregatedRating:{rating,ratingCountV2}}}}} = item
      return(
      <>
       <div key={i}
       className="flex items-center justify-between w-full"
       >
        <div className="w-[70%]">
          <p>{vegClassifier}</p>
          <p>{name}</p>
          <p>र {defaultPrice/100}</p>
          <p className="flex ">
          <i className="fi fi-ss-star"></i>
          <span>{rating} ({ratingCountV2})</span>
          </p>
        </div>
        <div className="w-[18%]">
          <img
          className=" w-[155px] h-[144px] relative"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}/>
          
          <button
          className="text-green-600 font-extrabold text-xl w-[120px] h-[50px] rounded-xl  bg-white border-2 shadow-sm"
          >ADD</button>
        </div>
        
       </div>
       <hr className="border-2 my-4"/>
      </>
      )
    })
   }
</div>
  )
}
export default RestaurantMenu;




