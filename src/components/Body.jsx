import { useContext, useEffect, useState } from "react";
import axios from "axios";

import OnYourMind from "./OnYourMind";
import TopResturants from "./TopResturants";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../contextApi/context";

function Body() {
  var {coord:{lat,lng}}= useContext(Coordinates)
  var [topResturantsTitle,setTopResturantsTitle] = useState("")
  var [onlineFoodDeliveryTitle,setOnlineFoodDeliveryTitle] = useState("")

  useEffect(() => {
    axios
      .get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      .then((res) => {
        setTopResturantsTitle(res?.data?.data?.cards[1]?.card?.card?.header?.title);
        console.log(res?.data?.data?.cards[2]?.card?.card?.title);
        setOnlineFoodDeliveryTitle(res?.data?.data?.cards[2]?.card?.card?.title);
        setOnYourMind(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setTopResturants(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      });
  }, [lat,lng]);

  var [onYourMind, setOnYourMind] = useState([]);
  var [topResturants,setTopResturants] = useState([]);

  return (
    <div className="w-full  ">
      <div className="w-[74%] relative mx-auto overflow-hidden ">
        <OnYourMind data={onYourMind}/>
        <TopResturants data={topResturants} title={topResturantsTitle}/>
        <OnlineFoodDelivery data={topResturants} title={onlineFoodDeliveryTitle}/>
      </div>
    </div>
  );
}

export default Body;