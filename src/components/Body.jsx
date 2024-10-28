import axios from "axios";
import OnYourMind from "./OnYourMind";
import TopResturants from "./TopResturants";
import { useEffect, useState } from "react";
import OnlineFoodDelivery from "./OnlineFoodDelivery";

function Body() {
  useEffect(() => {
    axios
      .get(
"https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      )
      .then((res) => {
        setOnYourMind(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setTopResturants(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      });
  }, []);
  var [onYourMind, setOnYourMind] = useState([]);
  var [topResturants,setTopResturants] = useState([])

  return (
    <div className="w-full mt-1">

      <div className="w-[74%] mx-auto overflow-hidden ">
        <OnYourMind data={onYourMind}/>
        <TopResturants data={topResturants}/>
        <OnlineFoodDelivery data={topResturants}/>
      </div>
    </div>
  );
}

export default Body;
