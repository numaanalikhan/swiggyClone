function RestOffersCard({ handleNext, handlePrev, value, restOffers }) {
    return (
      <div className="w-full mt-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl ">Deals for You</h1>
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                handlePrev();
              }}
              className={
                `cursor-pointer w-8 h-8  rounded-full flex items-center justify-center ` +
                (value <= 0 ? "bg-slate-100" : "bg-slate-300")
              }
            >
              <i
                className={
                  `text-2xl mt-1 fi fi-rr-arrow-small-left ` +
                  (value <= 0 ? "text-slate-300" : "text-black")
                }
              ></i>
            </div>
  
            <div
              onClick={() => {
                handleNext();
              }}
              className={
                `cursor-pointer w-8 h-8 rounded-full flex items-center justify-center ` +
                (value >= 303 ? "bg-slate-100" : "bg-slate-300")
              }
            >
              <i
                className={
                  `text-2xl mt-1 fi fi-rr-arrow-small-right ` +
                  (value >= 303 ? "text-slate-300" : "text-black")
                }
              ></i>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 overflow-hidden ">
          {restOffers?.map((item) => {
            var { restId, offerLogo, header, description } = item.info;
            return (
              <div
                style={{
                  transform: `translateX(-${value <= 303 ? value : ""}%)`,
                }}
                key={restId}
                className="min-w-[328px] border rounded-2xl flex gap-4 px-2 py-2 duration-1000"
              >
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/${offerLogo}`}
                />
                <div className="w-full">
                  <h1 className="font-extrabold text-[16px]">{header}</h1>
                  <p className="text-[13px] font-bold text-gray-500">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  export default RestOffersCard