import axios from "axios";
import {  useEffect, useState } from "react";
import Dishes from "./Dishes";
import RestaurantData from "./RestaurantData";
import IsDiffRest from "./IsDiffRest";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("Dishes");

  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const handleSearch = (e) => {
    let val = e.target.value.trim()
    if(e.keyCode==13){
      setSearchQuery(val);
    }
  };
  const handleClick = (item) => {
    setActive(active === item ? item : item);
  };

  const options = ["Restaurants", "Dishes"];

  const fetchDishes = async () => {
    const res = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.3992721&lng=78.4627103&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=884634aa-ed78-49c5-bbb2-a8d12024ca97&limit=10&page=1`
    );
    
    setDishes(
      res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.filter(
        (card) => {
          return card?.card?.card?.info;
        }
      )
    );
  };
  
  const fetchRestaurants = async () => {
    const res = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.3992721&lng=78.4627103&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=884634aa-ed78-49c5-bbb2-a8d12024ca97&selectedPLTab=RESTAURANT`
    );
    console.log(res);
    let rest =  res?.data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(
      (card) => {
        return  card?.card?.card?.info;
      }
    );
   
    setRestaurantData(rest);
  };
  useEffect(() => {
    if (searchQuery === "") return;
    fetchDishes();
    fetchRestaurants();
  }, [searchQuery]);

  return (
    <div className="w-full md:w-[800px] mx-auto">
      <input
        type="text"
        // value={searchQuery}
        onKeyDown={handleSearch}
        className="w-full md:w-full h-[50px] border-2 px-4 focus:outline-none"
        placeholder="Search for restaurant and food "
      />
      <div className="flex my-5 items-center gap-5">
        {options.map((item) => {
          return (
            <button
              key={item}
              className={`px-5 py-2 border rounded-[50px] font-extrabold ${
                active === item ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => {
                handleClick(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className='w-full md:w-[800px] mx-auto border bg-[#F0F1F2]'>
        {active==="Dishes" ? <Dishes dishes={dishes} /> : <RestaurantData restaurantData={restaurantData}/>}

      </div>
      <IsDiffRest/>

    </div>
  );
}

export default Search;
