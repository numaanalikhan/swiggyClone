import { useContext, useState } from "react";
import { CartContext, RestInfo } from "../../contextApi/context";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../utils/cartSlice";

function DetailMenu ({ itemCards }) {
    let veg =
      "https://th.bing.com/th/id/OIP.u4Ean5n_ynRjwuny0C9EnQHaHa?rs=1&pid=ImgDetMain";
    let novVeg =
      "https://th.bing.com/th/id/OIP.SUHy0fBO5GnXnuZ-GRnrowHaHx?rs=1&pid=ImgDetMain";
      var {cartData,setCartData} = useContext(CartContext)
      var {restInfo} = useContext(RestInfo);


  //     var cartData = useSelector((state)=>{state.cartSlice.cartData});
  //     var dispatch = useDispatch()

  // var restInfo =  useSelector((state)=>{state.cartSlice.restInfo})
     

      return itemCards?.map((item, i) => {
        var {card:{info}} = item
        info.restId= restInfo?.id;
        info.restName=restInfo?.name;
        const { name,
                price,
                imageId,
                defaultPrice,
                itemAttribute: { vegClassifier },
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
             } = info
        
      const handleAddToCart = ()=>{
        var isAddedToCart = cartData?.find(item=>item?.id === info?.id)
        let getLocalStorageRestInfo = JSON.parse(localStorage.getItem("restInfo")) || [];
        if(!isAddedToCart){
            if(getLocalStorageRestInfo?.name===restInfo?.name || getLocalStorageRestInfo.length===0){
              setCartData(prev=>[...prev,info]);
              localStorage.setItem("cart",JSON.stringify([...cartData,info]));
              localStorage.setItem("restInfo",JSON.stringify(restInfo));
            }
            else {
              alert(`want to clear previous restaurant items`)
            }
        }else{
          alert(`item already existed`)
        }




      //   var sameRest = cartData.length>0 ? cartData.find(item=>item?.restName===info?.restName) : true
      // if(!isAddedToCart  ){
      //   if(sameRest){
      //     setCartData(prev=>[...prev,info]);
      //     localStorage.setItem("cart",JSON.stringify([...cartData,info]))
      //   }
      //   else alert(`want to clear previous restaurant items`)
      // }
      // else{
      //   alert(`${info?.name} is already existed in Cart`)
      // }
      // console.log(info)
      } 
      // var itemDescription = description ? description : "";
      return (
        <>
          <div
            key={i}
            className="flex items-center justify-between w-full h-auto  mb-8 mt-2"
          >
            <div className="w-[70%] min-h-full ">
              <img
                className="w-4"
                src={vegClassifier === "VEG" ? veg : novVeg}
                alt={name}
              />
              <p className="font-bold">{name}</p>
              <p className="font-bold">
                र {defaultPrice / 100 || Math.floor(price / 100)}
              </p>
              <span className="flex items-center gap-1 text-sm mb-2">
                <i className="fi fi-ss-star my-2 text-sm"></i>
                <span className="">
                  <span className="font-bold text-green-700">{rating}</span>(
                  {ratingCountV2})
                </span>
              </span>
  
             <Description item={item}/>
            </div>
  
            <div className="w-[18%] h-full relative ">
              {imageId ? (
                <img
                  className=" w-full  h-[125px] rounded-lg"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                />
              ) : (
                ""
              )}
  
              <button 
              onClick={()=>{handleAddToCart()}}              
              className="hover:bg-slate-200 duration-100 text-green-600 font-extrabold text-sm w-[100px] h-[35px] rounded-xl  bg-white drop-shadow-xl absolute left-5 bottom-[-10px] ">
                ADD
              </button>
            </div>
          </div>
          <hr className="border mb-8  " />
        </>
      );
    });
  }
  
  function Description ({item}){
    var {card:{info:{description}}} = item
  
    var [isMore, setIsMore] = useState(true);
    var toogleMfore = () => {
      setIsMore(!isMore);
    };
       
    var itemDescription = description ? description :"baigan"
  
    return(
       <div className="w-full h-full">
      {
          itemDescription.length <= 145 ?
          (<p>{itemDescription}</p> ):
           
               (
          <div className="h-full "
          onClick={() => {
            toogleMfore();
          }}
              >
          <span
            className={`text-slate-600 ` + (isMore ? "line-clamp-2" : "")}
          >
            {itemDescription}...
          </span>
          <button className="cursor-text text-slate-600 ">
            {isMore ? "more" : "less"}
          </button>
              </div>
       )
      }
      </div>
    )
  }

  export default DetailMenu