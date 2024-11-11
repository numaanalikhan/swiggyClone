import { data } from "autoprefixer";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Coordinates, Visibility } from "../../contextApi/context";
import MenuCard from "../RestaurantMenu/MenuCard";
import RestInfoCard from "../RestaurantMenu/RestInfoCard";
import RestOffersCard from "../RestaurantMenu/RestOffersCard";


function RestaurantMenu() {
  var params = useParams();
  var id = params.id.split("-").at(-1).slice(4);

  var [restInfo, setRestInfo] = useState([]);
  var [restOffers, setRestOffers] = useState([]);
  var [restMenu, setRestMenu] = useState([]);
  var [value, setValue] = useState(0);
  var [topPicks,setTopPicks] = useState(null);
  
  var {coord:{lat,lng}}= useContext(Coordinates)
  var {visible}=useContext(Visibility)
  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      )
      .then((res) => {
      
        setRestInfo(res?.data?.data?.cards[2]?.card?.card?.info);
        setRestOffers(
          res?.data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.offers
        );
        
        let actualMenu =res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        setTopPicks(actualMenu?.filter((data)=>{
          return(
            data?.card?.card?.title === "Top Picks"
          )
          
        })[0])
        // console.log(res?.data?.data?.cards[4]);
        setRestMenu(actualMenu.filter((data)=>{
          return(
            data?.card?.card?.itemCards || data?.card?.card?.categories
          )
        }))
      })
    },[]);

      

  const handlePrev = () => {
    setValue((prevStateValue) => prevStateValue - 101);
  };
  const handleNext = () => {
    setValue((prevStateValue) => prevStateValue + 101);
  };
  // const toogleFun = (index) => {
  //   setCurrIdx(index === currIdx ? null : index);
  // };

  return (
    <div className="w-full mt-6 ">
      <div className="w-[62%] mx-auto ">
        <p className="text-gray-400 text-[10px] font-semibold">
          <Link to="/">
            <span className="hover:text-gray-500">Home</span>
          </Link>{" "}
          / <span className="hover:text-gray-500">{restInfo.city}</span> /{" "}
          <span className="text-gray-500">{restInfo.name}</span>
        </p>
        <h1 className="font-bold text-xl mt-6">{restInfo.name}</h1>

        <RestInfoCard {...restInfo} />
        <RestOffersCard
          handleNext={handleNext}
          handlePrev={handlePrev}
          value={value}
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
       {
        topPicks && 
        topPicks.card.card.carousel.map((item)=>{
          
          var {dish:{info:{imageId,id}}} = item
          return(
              <img key={id} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${imageId}`}/>
          )
        })
       }
        <hr />

       

        {restMenu?.map((item, idx) => {
          var {
            card: { card },
          } = item;
          return (
            <>
              <MenuCard card={card} idx={idx} />

              <hr className="border-[8px] border-gray-100 mb-4" />
            </>
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
