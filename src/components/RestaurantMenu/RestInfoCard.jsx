function RestInfoCard({
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    sla,
    locality,
  }) {
    return (
      <>
        <div
         className=" w-full h-[170px] bg-gradient-to-t from-slate-200/70 rounded-3xl mt-4 px-4 pb-4">
          <div className="w-full h-full bg-white rounded-3xl p-4 border">
            <div className="flex gap-2 items-center font-bold ">
              <i className="fi fi-ss-circle-star text-green-500 mt-1"></i>
              <span>{avgRatingString} </span>
              <span>({totalRatingsString})</span>
              <span>{costForTwoMessage}</span>
            </div>
            <p className="text-[#F55205] font-bold pl-2 underline ">
              {cuisines?.join(", ")}
            </p>
            <div className=" pl-3 mt-2 flex items-center gap-4 ">
              <div className="w-[8px] flex flex-col items-center">
                <div className="w-[8px] h-[8px] rounded-full bg-gray-300"></div>
                <div className="w-[2px] h-[32px] bg-gray-300"></div>
                <div className="w-[8px] h-[8px] rounded-full bg-gray-300"></div>
              </div>
              <div className="">
                <p className="mb-3 font-semibold flex gap-4 ">
                  Outlet <span className="text-gray-400  "> {locality}</span>
                </p>
                <p className="font-bold">
                  {sla?.slaString?.replace("MINS", "mins")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default RestInfoCard