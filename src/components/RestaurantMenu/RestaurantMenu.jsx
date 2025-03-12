import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext, Coordinates, RestInfo} from "../../contextApi/context";
import MenuCard from "../RestaurantMenu/MenuCard";
import RestInfoCard from "../RestaurantMenu/RestInfoCard";
import RestOffersCard from "../RestaurantMenu/RestOffersCard";
// import { useSelector } from "react-redux";


function RestaurantMenu() {
  var params = useParams();
  var id = params.id.split("-").at(-1).slice(4);

  var [restOffers, setRestOffers] = useState([]);
  var [restMenu, setRestMenu] = useState([]);
  var [value, setValue] = useState(0);
  var [topPicks,setTopPicks] = useState(null);
  
  var {coord:{lat,lng}}= useContext(Coordinates)
  var {cartData,setCartData} = useContext(CartContext)
  var {restInfo,setRestInfo} = useContext(RestInfo)
  
  const handleAddToCart = (info)=>{
    const updInfo = {...info,restName:restInfo.name}
    console.log(updInfo);
    var isAddedToCart = cartData?.find(item=>item?.id === info?.id)
    if(!isAddedToCart){
      let getLocalStorageRestInfo = JSON.parse(localStorage.getItem("restInfo")) || []
      if(getLocalStorageRestInfo.name===restInfo?.name || getLocalStorageRestInfo.length===0){
        setCartData(prev=>[...prev,updInfo]);
        localStorage.setItem("cart",JSON.stringify([...cartData,updInfo]));
        localStorage.setItem("restInfo",JSON.stringify(restInfo));
      }
      else {
        alert(`you are ordering from other restaurant`)
      }
     
    }
    else{
      alert("item already existed")
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      )
      .then((res) => {
      
        
        setRestInfo(res?.data?.data?.cards[2]?.card?.card?.info);
        // console.log(res?.data?.data?.cards[2]?.card?.card?.info);
        
        setRestOffers(
          res?.data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.offers
        );
        
        let actualMenu =res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        // console.log(actualMenu);
        
        setTopPicks(actualMenu?.filter((data)=>{
          return(
            data?.card?.card?.title === "Top Picks"
          )
          
        }
      )[0])
        // console.log(res?.data?.data?.cards[4]);
        setRestMenu(actualMenu.filter((data)=>{
          return(
            data?.card?.card?.itemCards || data?.card?.card?.categories
          )
        }))
      }    
    )
    },[]);

      

  const handlePrev = () => {
    setValue((prevStateValue) => prevStateValue - 101);
  };
  const handleNext = () => {
    setValue((prevStateValue) => prevStateValue + 101);
  };
  const toogleFun = (index) => {
    setCurrIdx(index === currIdx ? null : index);
  };

  return (
    <div className="w-full mt-5 relative">
      <div className="w-[62%] mx-auto ">
        <p className="text-gray-400 text-[10px] font-semibold">
          <Link to="/">
            <span className="hover:text-gray-500">Home</span>
          </Link>{" "}
          / <span className="hover:text-gray-500">{restInfo?.city}</span> /{" "}
          <span className="text-gray-500">{restInfo?.name}</span>
        </p>
        <h1 className="font-bold text-xl mt-6">{restInfo?.name}</h1>
        <RestInfoCard {...restInfo} />
        <RestOffersCard
          // handleNext={handleNext}
          // handlePrev={handlePrev}
          // value={value}
          restOffers={restOffers}
        />

        <p className="text-center mt-12">Menu</p>
        <div className="relative w-full h-[48px] mt-6 mb-6 ">
          <input
            type="text"
            placeholder="Search for dishes"
            className="relative w-full h-full placeholder:text-center placeholder:font-bold placeholder:text-black bg-gray-200 rounded-xl outline-none"
          />
          <i className="fi fi-rr-search absolute bottom-3 right-4"></i>
        </div>
        <div className="flex items-center gap-4 pl-4">
          <div>Veg</div>
          <div>nonVeg</div>
          <div>BestSeller</div>
          <div>Guiltfree</div>
        </div>
        <hr className="mt-4 border" />

          <h1>{topPicks?.card?.card?.title}</h1>
         <div className="w-full flex gap-2 overflow-hidden mt-2 ">
         {
          topPicks &&
          topPicks.card.card.carousel.map((item,idx)=>{
            var {dish:{info},creativeId} = item
            // console.log(creativeId);
            return(
                <div key={idx} className="w-full h-full  relative ">
                <div className=" w-[384px] h-[395px] absolute z-10   rounded-lg">
                  <button 
                   onClick={()=>{
                    handleAddToCart(info)}
                  }
                   style={{
                    top: '88%', // This positions the button 80% from the top of the container
                    left: '70%', // This positions the button at 50% of the container's width (centered)
                    transform: 'translate(-50%, -50%)', // This ensures the button is centered both vertically and horizontally
                    width: '50%', // You can set the width as a percentage of the container's width
                    height: '13%', // Set the height relative to the container's height
                  }}
                  className=" absolute text-balance text-green-500 font-bold bg-white top-[250px] left-[160px]  h-full text-lg rounded-md">Add</button>
                  </div>
                  <img
                  className="w-full h-full object-cover rounded-lg"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}/>
              </div>
             
            )
          })
         }
       </div>
        <hr /> 

       

        {restMenu?.map((item, idx) => {
          var {
            card: { card },
          } = item;
          return (
            <div key={idx}>
              <MenuCard card={card} idx={idx} />
              
              <hr className="border-[8px] border-gray-100 mb-4" />
            </div>
          );
        })}
      </div>
      <div className={"bg-black w-[70px] h-[70px]  rounded-full flex items-center justify-center fixed bottom-4 right-[245px]"}>
        <p className="font-bold text-white ">Menu</p>
      </div>
    </div>
  );
}

export default RestaurantMenu;
