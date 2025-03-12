import { useState } from "react";
import DetailMenu from "../RestaurantMenu/DetailMenu";
import IsDiffRest from "../IsDiffRest";


function MenuCard({ card }) {


  let isOpenCategory = false;
  if (card["@type"]) {
    isOpenCategory = true;
  }
  var [isOpen, setIsOpen] = useState(isOpenCategory);
  const toggleArrow = () => {
    return setIsOpen((prevStateValue) => !prevStateValue);
  };

  if (card?.itemCards) {
    var { title, itemCards } = card;

    return (
      <div className="relative w-full">
        <div
          className="flex justify-between   py-4 items-center cursor-pointer  bg-white w-full "
          onClick={() => {
            toggleArrow();
          }}
        >
          <span
            className={
              `font-bold text-black text-` + (card["@type"] ? "xl" : "base")
            }
          >
            {title} ({itemCards?.length})
          </span>
          <i
            className={
              `text-2xl font-bold text-gray-800 fi fi-rs-angle-small-` +
              (isOpen ? "up" : "down")
            }
          ></i>
        </div>
        {isOpen && (
          <>
            <DetailMenu
              itemCards={itemCards}
              className="z-10"
            />
          </>
        )}

        <IsDiffRest/> 
      </div>
    );
  } else {
    var { title, categories } = card;
    return (
      <>
        <span className={`font-bold text-black text-xl`}>{title} </span>

        {categories?.map((item) => {
          return (
            <>
              <MenuCard card={item} />
            </>
          );
        })}
      </>
    );
  }
}

export default MenuCard;
