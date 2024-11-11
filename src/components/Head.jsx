import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../Constants/data";
// import SearchInput from "./SearchInput";
import {  Coordinates, Visibility } from "../contextApi/context";
import axios from "axios";


function Head() {
  var [locArr, setLocArr] = useState([]);
  var { setVisible } = useContext(Visibility);
  const handleVisibility = () => {
    setVisible((prev) => !prev);
  };
  var [searchLocation, setSearchLocation] = useState("");
  
  var searchLocationFun = (e) => {
    setSearchLocation(e.target.value);
    if(searchLocation=== "") return 
    axios
    .get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchLocation}&types=`)
    .then((res) => {
      setLocArr(res?.data?.data)
      console.log(res?.data?.data);
    })
  };
  var {setCoord,setTitleName} = useContext(Coordinates)
  var {visible} = useContext(Visibility)
  var [address,setAddress] = useState({})
  var getCordinates = (place_id,main_text,secondary_text)=>{
    axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`)
    .then((res)=>{
      setCoord(res?.data?.data[0]?.geometry?.location);
      setTitleName(main_text);
      // setAddress(structured_formatting);
      setAddress({main_text,secondary_text});
      
    })  
  }
  return (
    <div className={"relative w-full  "}>
        <div className={" " + (visible ? "visible" : "invisible")}>
        <div
          onClick={handleVisibility}
          className="bg-black/50  w-full h-full fixed  z-40 "
        ></div>
        <div
          className={
            "bg-white w-[35%] h-full fixed z-50 duration-700 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div onClick={handleVisibility} className={"cursor-pointer w-10 h-10 ml-5 mt-5 flex items-center justify-center hover:bg-red-500"}
          >
            <i className="fi fi-rr-cross hover:bg-red-400"></i>
          </div>
          <div className='mx-auto'>
          <input
            className=' border-2 border-black'
            onChange={(e) => {
              searchLocationFun(e);
            }}
            type="text"
            value={searchLocation}
          />
          </div>

          {locArr.map((item) => {
            var {
              structured_formatting: { main_text, secondary_text },
              place_id,
            } = item;
            return (
              <>
               <Link to="/">
               <div
                  onClick={()=>{getCordinates(place_id,main_text,secondary_text),handleVisibility()}}
                  key={place_id}
                  className="border border-black/20 w-96 mb-5 mx-auto p-4"
                >
                  <p>{main_text}</p>
                  <p className="text-xs text-gray-400 font-bold mt-1">{secondary_text}</p>
                </div>
               </Link>
              </>
            );
          })}
        </div>
      </div>
      {/* <SearchInput handleVisibility={handleVisibility} locArr={locArr} setLocArr={setLocArr} searchLocationFun={searchLocationFun} /> */}
      <div className={"bg-white flex justify-center items-center  mx-auto p-5 z-40 border-b-2 "}>
        <div className="w-[90%] h-full flex items-center justify-between gap-5">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img
                className="w-10 rounded-lg"
                src="https://play-lh.googleusercontent.com/ymXDmYihTOzgPDddKSvZRKzXkboAapBF2yoFIeQBaWSAJmC9IUpSPKgvfaAgS5yFxQ=w480-h960-rw"
              />
            </Link>
            <div
              className="flex items-center gap-3 justify-center "
              onClick={() => {
                handleVisibility();
              }}
            >
              <p className="font-semibold border-b-2 border-black text-sm">
                {address?.main_text}
              </p>
              <p className="font-semibold text-gray-500  text-sm line-clamp-1 flex items-center justify-center ">
                {address?.secondary_text}
              <i className="fi fi-rs-angle-small-down mt-2 text-orange-500 text-2xl"></i>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {data?.map((item, idx) => {
              return (
                <div key={idx} className="flex items-center gap-3">
                  <i className={`fi ${item.image}`}></i>
                  <p className="mb-1 font-semibold text-xs">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head;
