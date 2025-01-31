import React, { useContext, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { Coordinates } from "../contextApi/context";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../utils/filterSlice";

function OnlineFoodDelivery({ data, title }) {
  var { titleName } = useContext(Coordinates);
  var [activeBtn, setActiveBtn] = useState(null);
  const dispatch = useDispatch()
  var filterOptions = [
    {
      filterName: "Filter",
    },
    {
      filterName: "Sort By",
    },
    {
      filterName: "Rating 4.0+",
    },
    {
      filterName: "Rs. 300-Rs 600",
    },
    {
      filterName: "Less than Rs. 300",
    },
  ];

  const handleFilter = (idx)=>{
    if(idx==0){
      setActiveBtn(null)
    }
      setActiveBtn(idx)
    }
    dispatch(setFilterValue(activeBtn)) 


  return (
    <div>
      <div className="mt-8">
        <h1 className="text-black font-bold text-xl">{title}</h1>
      </div>

      {
        // filter options
      }
      <div className="flex gap-2 mt-3">
        {filterOptions.map((options, idx) => {
          return (
            <button
              onClick={() => {
                handleFilter(idx);
              }}
              className={`filterBtn flex gap-2 items-center ${activeBtn==idx ? "active" :null}`}
              key={idx}
            >
              <p>{options.filterName}</p>
              <i className='fi fi-rr-cross text-xs mt-1 hidden'/>
              {/* display:none || hidden removes from the dom t*/}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {data?.map((item) => {
          var {
            info,
            cta: { link },
          } = item;
          // console.log(item);

          return <Card key={info.id} {...info} link={link} width="218" />;
        })}
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;

// <div className=' bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Filter</span>
// <i className="fi fi-rr-settings-sliders mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Sort By</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Food Deleivery</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>New on Swiggy</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Rating 4.0</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Pure Vet</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Offers</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Rs.300-Rs.600</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
// <div className='px-2 bg-white border-gray-100 border-2 shadow-lg mb-4 rounded-2xl flex items-center justify-center gap-2'>
// <span className=' font-semibold'>Less than Rs. 300</span>
// <i className="fi fi-rs-angle-small-down mt-[6px] text-[12px] font-semibold"></i>
// </div>
