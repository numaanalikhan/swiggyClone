import axios from "axios";
import { useEffect, useState } from "react";

function Body() {
  useEffect(() => {
    axios
      .get(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      )
      .then((res) => {
        console.log(
          res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info
        );
        setData(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
      });
  }, [data]);
  var [data, setData] = useState([]);
  var [value,setValue] = useState(0)
  const handleNext = ()=>{
    value >= 240 ? "" : setValue(prevStateValue=>prevStateValue + 80) 
  }
  console.log(value);
  const handlePrev = ()=>{
    console.log("Handle Prev is called");
    value <= 0 ? "" : setValue(prevStateValue=>prevStateValue - 80)
  }
  return (
    <div className="w-full mt-2">

      <div className="w-[72%] mx-auto overflow-hidden ">

        <div className="flex items-center justify-between">
          <h1>What's on Your Mind</h1>

          <div className="flex gap-2">
            <div 
            onClick={()=>{handlePrev()}}
           
            className={`rounded-full w-9 h-9 flex justify-center items-center mt-1  cursor-pointer ` +(value <=0 ? "bg-gray-50" : "bg-gray-200")}>
            <i className={`fi text-2xl fi-rr-arrow-small-left `+(value <= 0 ? "text-gray-300" :"text-black")}></i>
            </div>

            <div
            onClick={()=>{handleNext()}}
            className= {`rounded-full w-9 h-9 flex justify-center  cursor-pointer items-center mt-1 `+ (value >= 240 ?  "bg-gray-50" : "bg-gray-200")}>
            <i className={`fi text-2xl fi-rr-arrow-small-right ` + (value >=240 ? "text-gray-300" : "text-black") }></i>
            </div>

            
          </div>
        </div>

        <div
         style={{transform:`translateX(-${value}%)`}}
         className="flex border duration-1000 transition-all-ease mt-2">
          {data.map((item) => {
            return (
              <img
                key={item.id}
                className="w-36"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
