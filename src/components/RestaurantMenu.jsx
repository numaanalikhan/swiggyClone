import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function RestaurantMenu() {
  var params = useParams();
  console.log("");
  var id = params.id.split("-").at(-1).slice(4);

  var [restMenu, setRestMenu] = useState([]);
  // console.log(params)
  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.406498&lng=78.47724389999999&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      )
      .then((res) => {
        console.log(res?.data?.data?.cards[2]?.card?.card?.info);
        setRestMenu(res?.data?.data?.cards[2]?.card?.card?.info);
        // console.log(res?.data?.data?.cards[2] );
      });
  }, []);
  return (
    <div className="w-full mt-6">
      <div className="w-[62%] mx-auto ">
    
        <div className="text-gray-400 text-[10px] font-semibold">
          <Link to="/">
            <span>Home / </span>
          </Link>
          <span>Hyderabad / </span>
          <span>{restMenu.name}</span>
        </div>
        <div className="mt-6">
          <h1 className="font-bold text-xl">{restMenu.name}</h1>
        </div>
        <div className="w-[97%]  mx-auto mt-6 shadow-2xl p-4 rounded-2xl">
          <div className="px-1 flex items-center gap-2">
            <i className="fi fi-ss-circle-star text-green-500"></i>
            <p className="flex gap-2 items-center font-semibold mb-1">
                <span>{restMenu?.avgRatingString}</span>
                <span>({restMenu?.totalRatingsString})</span>
                <span>{restMenu?.costForTwoMessage}</span>
            </p>
          </div>
          <p className="text-[#F55205] font-bold px-4 ">{restMenu?.cuisines?.join(", ")}</p>
        </div>
                
      </div>
    </div>
  );
}

export default RestaurantMenu;
