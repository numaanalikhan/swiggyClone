import React from "react";
import { Link } from "react-router-dom";

function Head (){
    var data = [
        {
            name:"Swiggy Corporate",
            image:"fi-rr-shopping-bag"
        },
        {
            name:"Search",
            image:"fi-rr-search"
        },
        {
            name:"Offers",
            image:"fi-rr-badge-percent"
        },
        {
            name:"Help",
            image:"fi-rr-life-ring"
        },
        {
            name:"Sign in",
            image:"fi-rr-user"
        },
        {
            name:"Cart",
            image:"fi-tr-cart-shopping-fast"
        }
    ]
    return (
        <div className="w-full shadow-lg h-[60px] flex items-center justify-center p-4">
            <div className="w-[78%]  flex items-center justify-between gap-5">
                
                <div className="flex items-center gap-6">
                    <Link to="/">
                        <img
                        className="w-10 rounded-lg"
                        src="https://play-lh.googleusercontent.com/ymXDmYihTOzgPDddKSvZRKzXkboAapBF2yoFIeQBaWSAJmC9IUpSPKgvfaAgS5yFxQ=w480-h960-rw"/>
                    </Link>
                    <p className="font-semibold border-b-2 border-black text-xs">Others</p>
                    <i className="fi fi-rs-angle-small-down mt-2 text-orange-500 text-2xl"></i>
                </div>

                <div className="flex items-center gap-8">
                        {
                            data?.map((item,idx)=>{
                                return(
                                    <div key={idx} className="flex items-center gap-3">
                                    <i className={`fi ${item.image}`}></i>
                                    <p className="mb-1 font-semibold text-xs">{item.name}</p>
                                    </div>
                                )
                                   
                            })

                        }
                        
                </div>
            </div>


         
        </div>
    )
}

export default Head;