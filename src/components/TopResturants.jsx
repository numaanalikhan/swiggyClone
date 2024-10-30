
import { useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

function TopResturants({data}) {
  // var {data}= props
  
  const handlePrev = ()=>{
    // console.log("handlePrev fun is called");
    setValue(prevStateValue => prevStateValue -85)
  }  
  const handleNext = ()=>{
    // console.log("handleNext fun is called");
    setValue(prevStateValue=> prevStateValue + 85)
  }  
  var [value,setValue] = useState(0)
  console.log(data);
  
  return (
    <div className='mt-8'>
        <div className='flex justify-between duration-1000]'>
            <h1 className='text-xl font-bold'>Top resturant chains in Hyderabad</h1>
            <div className='flex gap-2 items-center'>
                <div 
                
                onClick={()=>{handlePrev()}}
                className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center ${(value <= 0 ? "bg-gray-50" : "bg-gray-200")}`}>
                <i className={`fi fi-rr-arrow-small-left text-xl ${(value <=0 ? "text-gray-300" : "text-black")}`}></i>
                </div>
                <div 
                 onClick={()=>{handleNext()}}
                className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center ${(value >= 430 ?"bg-gray-50":"bg-gray-200")}`}>
                <i className={`fi fi-rr-arrow-small-right text-xl ${(value>=430 ? "text-gray-300" :"text-black")}`}></i>
                </div>
            </div>
        </div>
        
        <div
        className="flex duration-1000 mt-4  w-full gap-6 "
        style={{ transform: `translateX(-${value >= 430 ? "" : value}%)` }}
      >
        
        {data?.map(({info,cta:{link}}) => {
          // var {info , cta:{link}} = item
          return (
         <Card key={info.id}{...info} link={link} width="228"/>
          )
        })}
      </div>
        <hr className="border mt-8"/>


    </div>
  )
}

export default TopResturants