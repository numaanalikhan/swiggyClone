import React, { useContext, useState, } from "react";
import { Link } from "react-router-dom";
import { data } from "../Constants/data";
// import SearchInput from "./SearchInput";
import { CartContext, Coordinates, Visibility } from "../contextApi/context";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { loginToogleAction, toggleSearchBarAction } from "../utils/toogleSlice";//rdk
import SignIn from "./SignIn";

function Head() {
  var [locArr, setLocArr] = useState([]);
  // var { setVisible,visible } = useContext(Visibility);//useSelector//rdk
  var dispatch = useDispatch();//rdk
  var visible = useSelector((state)=>state.toogleSlice.searchBarToogle)//rdk
  var loginToogle = useSelector((state)=>state.toogleSlice.loginToogle)
  // console.log(visible)//rdk
  const cartData =useSelector((state)=>{ return state.cartSlice.cartData})
  
  const userData = useSelector((state)=>{ return state.signInSlice.userData})
  
  const handleLoginToogle = ()=>{
    dispatch(loginToogleAction())
  }

  const handleVisibility = () => {
    dispatch(toggleSearchBarAction())//rdk
    // setVisible((prev) => !prev);//need to use dispatch
    // setSearchLocation("");
    // setLocArr([]);
    // localStorage.setItem("key",JSON.stringify(...locArr))
  };
  var [searchLocation, setSearchLocation] = useState("");

  var searchLocationFun = (e) => {
    setSearchLocation(e.target.value);
    if (searchLocation === "") return;
    axios
      .get(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchLocation}&types=`
      )
      .then((res) => {
        setLocArr(res?.data?.data);
      });
  };
  var { setCoord, setTitleName } = useContext(Coordinates);
  
  
  // var  cartData = useSelector((state)=>{state.cartSlice})
  var [address, setAddress] = useState({locality:[{long_name:""}]});
  var getCordinates = (place_id, main_text) => {
    handleVisibility;
    setLocArr([]);
    axios
      .get(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`
      )
      .then((res) => {
        setCoord(res?.data?.data[0]?.geometry?.location);
        setTitleName(main_text);
        console.log()
        let locality = res?.data?.data[0]?.address_components.filter((item)=>{
          return(
            item?.types?.join("")==="locality"
          )
        })
        let x=res?.data?.data[0]
        let secondary_text = 
        (x?.formatted_address?.split(",")[0]===locality[0]?.long_name) ?
        (x?.formatted_address?.split(",")?.splice(1)?.join("")||""):
        (x?.formatted_address)

        console.log()
        setAddress({ locality, secondary_text });
      });
  };
  const clearState = ()=>{
    setSearchLocation("")
    setLocArr([])
  }
  return (
    <div key={1} className={"sticky z-[1000] w-[100%] top-0"}>
      {/*this is slide bar*/}
      <div className={" " + (visible ? "visible" : "invisible")}>
        <div
          onClick={handleVisibility}
          className="bg-black/50  w-full h-full fixed  z-40 "
        ></div>
        <div
          className={
            " w-[35%] h-full fixed z-50 duration-700 bg-white over overflow-y-scroll " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          {/*cursor*/}
          <div
            onClick={handleVisibility}
            className={
              "cursor-pointer w-10 h-10 ml-5 mt-5 flex items-center justify-center hover:bg-red-500"
            }
          >
            <i className="fi fi-rr-cross hover:bg-red-400"></i>
          </div>
          <div className="mx-auto relative flex items-center justify-center">
            <input
              // className="      focus:shadow-xl border-2 "
              className="border-2 w-96 pl-8 py-3 pr-20 text-xl focus:outline-none overflow-hidden" // Added padding and full width to the input
              onChange={(e) => searchLocationFun(e)}
              type="text"
              value={searchLocation}
              placeholder="search for area, street name..."
            />

            {/* Positioned relative to the input container */}
            <p
             onClick={()=>{clearState()}}
             className={"absolute left-[340px] bottom-3 px-2 text-orange-400 font-semibold cursor-pointer "+(searchLocation ==="" ?"invisible":"visible")}>
              Cancel
            </p>
          </div>

            {/*api call*/}
          <div>
            {locArr.map((item,idx) => {
              var {
                structured_formatting: { main_text, secondary_text },
                place_id,
              } = item;
              return (
                <div key={idx}>
                    <div
                      onClick={() => {
                        getCordinates(place_id, main_text),
                          handleVisibility();
                      }}
                      key={place_id}
                      className="border border-black/20 w-96 mb-5 mx-auto p-4 mt-8"
                    >
                      <p>{main_text}</p>
                      <p className="text-xs text-gray-400 font-bold mt-1">
                        {secondary_text}
                      </p>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <SearchInput handleVisibility={handleVisibility} locArr={locArr} setLocArr={setLocArr} searchLocationFun={searchLocationFun} /> */}

{/* this is for sign in slide bar option */}
      <div className={" " + (loginToogle ? "visible" : "invisible")}>
        <div
            onClick={handleLoginToogle}
            className="bg-black/50  w-full h-full fixed  z-40 "
          ></div>
          <div
            className={
              " w-[35%] h-full fixed z-50 duration-700 bg-white  overflow-y-scroll " +
              (loginToogle ? "right-0" : "-right-[100%]")
            }
          >
            {/*cursor*/}
            <div
              onClick={handleLoginToogle}
              className={
                "cursor-pointer w-10 h-10 ml-5 mt-5 flex items-center justify-center hover:bg-red-500"
              }
            >
              <i className="fi fi-rr-cross hover:bg-red-400"></i>
            </div>
            <SignIn/>
            </div>
      </div>

      {/*This is orignial navbar*/}
      <div
        className={
          "bg-white flex justify-center items-center  mx-auto px-5 pt-3 pb-2  border-b-2 shadow-lg "
        }
      >
          {/* logo and navigation*/}
        <div className="w-[80%] h-full flex items-center justify-between gap-5 ">
          <div className="flex items-center gap-6 w-[1200px]">
            <Link to="/">
              <img
                className="w-10 rounded-lg"
                src="https://play-lh.googleusercontent.com/ymXDmYihTOzgPDddKSvZRKzXkboAapBF2yoFIeQBaWSAJmC9IUpSPKgvfaAgS5yFxQ=w480-h960-rw"
              />
            </Link>
            <div
              className="flex items-center gap-3 justify-center"
              onClick={() => {
                handleVisibility();
              }}
            >
              <p className="font-semibold border-b-2 border-black text-sm">
                {address?.locality[0]?.long_name || "other"}
              </p>
              <div className="font-semibold text-gray-500  text-sm  w-full">
                <span className="line-clamp-1">{address?.secondary_text}</span>
                <span className="fi fi-rs-angle-small-down mt-2 text-orange-500 text-2xl"></span>
              </div>
            </div>
          </div>
          
          {/* NavBar*/}
          <div className="flex items-center gap-8">
            {data?.map((item, idx) => {
              return (
                <div  key={idx}>
                 {
                  item.name =="Sign in" ? (
                    <div onClick={handleLoginToogle}>
                    <div className="flex items-center justify-center gap-3 ">
                     
                          {userData ? <img className="w-[35px] h-[35px] rounded-full" src={userData?.photo}/>  :<i className={`fi ${item.image}`}></i>}    
                              <p className="mb-1 font-semibold text-xs ">{userData ? userData?.name : item.name}</p>
                    </div>
                  </div>
                  ):(
                    <Link to={item?.path}>
                    <div className="flex items-center justify-center gap-3 ">
                      <i className={`fi ${item.image}`}></i>
                      <p className="mb-1 font-semibold text-xs ">{item.name}</p>
                      {item?.name=="Cart"&&<span className="mb-1">{<p className="font-bold text-green-700 shadow-lg bg-none">{cartData?.length>0?cartData?.length:""}</p>}</span>}
                      
                    </div>
                  </Link>
                  )
                 }
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
