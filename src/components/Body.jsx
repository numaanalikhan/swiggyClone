import { useContext, useEffect, useState } from "react";
import axios from "axios";

import OnYourMind from "./OnYourMind";
import TopResturants from "./TopResturants";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../contextApi/context";
import { useSelector } from "react-redux";

function Body() {
  var {coord:{lat,lng}}= useContext(Coordinates)
  var [topResturantsTitle,setTopResturantsTitle] = useState("")
  var [onlineFoodDeliveryTitle,setOnlineFoodDeliveryTitle] = useState("")
  var [unReachable,setUnReachable] = useState({})
  const filterVal = useSelector((state)=>state.filterSlice.filterVal)
  const filteredData = []
  useEffect(() => {
    axios
      .get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      .then((res) => {
        setUnReachable(res?.data?.data?.cards[0].card?.card)
        setOnYourMind(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setTopResturantsTitle(res?.data?.data?.cards[1]?.card?.card?.header?.title);
        setOnlineFoodDeliveryTitle(res?.data?.data?.cards[2]?.card?.card?.title);
        setTopResturants(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        // console.log(res?.data?.data.cards);
      });
  }, [lat,lng]);

  var [onYourMind, setOnYourMind] = useState([]);
  var [topResturants,setTopResturants] = useState([]);

  if(unReachable.title === "Location Unserviceable")  
     return(
      <div className="w-[30%] mx-auto mt-[65px] flex flex-col gap-5 items-center">
        <img 
        className="w-[250px] h-[250px]"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"/>
        <div className="flex items-center flex-col">
          <p className="font-bold text-xl">{unReachable.title}</p>
          <p className=" text-gray-500 font-semibold text-center">We don’t have any services here till now. Try changing location.</p>
        </div>
      </div>

     )
  return (
    <div className="w-full">
      <div className="w-[74%] relative mx-auto overflow-hidden">
        <OnYourMind data={onYourMind}/>
        <TopResturants data={topResturants} title={topResturantsTitle}/>
        <OnlineFoodDelivery data={filterVal ? filteredData : topResturants} title={onlineFoodDeliveryTitle}/>
      </div>
    </div>
  );
}

export default Body;