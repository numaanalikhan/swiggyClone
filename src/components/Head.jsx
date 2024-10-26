import React from "react";

function Head (){
    return (
        <div className="w-full shadow-lg h-[60px] flex items-center justify-center">
            <div className="w-[78%]  flex items-center justify-between gap-5">
                
                <div className="flex items-center gap-6">
                    <img
                    className="w-14 rounded-lg"
                    src="https://play-lh.googleusercontent.com/ymXDmYihTOzgPDddKSvZRKzXkboAapBF2yoFIeQBaWSAJmC9IUpSPKgvfaAgS5yFxQ=w480-h960-rw"/>
                    <p className="font-semibold border-b-2 border-black">others</p>
                    <i className="fi fi-rs-angle-small-down mt-2 text-orange-500 text-2xl"></i>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex">
                        <i className="fi fi-rr-shopping-bag"></i>
                        <p className="">Swiggy Corporate</p>
                    </div>
                    <div className="flex">
                        <i className="fi fi-rr-search"></i>
                        <p className="">Search</p>
                    </div>
                    <div className="flex">
                        <i className="fi fi-rr-badge-percent"></i>
                        <p className="">Offers</p>
                    </div>
                    <div className="flex">
                        <i className="fi fi-rr-life-ring"></i>
                        <p className="">Help</p>
                    </div>
                    <div className="flex">
                        <i className="fi fi-rr-user"></i>
                        <p className="">Sign in</p>
                    </div>
                    <div className="flex">
                        <i className="fi fi-rr-shopping-bag"></i>
                        <p className="">Cart</p>
                    </div>
                </div>
            </div>


         
        </div>
    )
}

export default Head;