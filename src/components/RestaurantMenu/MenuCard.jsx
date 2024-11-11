import { useState } from "react";
import DetailMenu from "../RestaurantMenu/DetailMenu";

function MenuCard({ card }) {
    // var {tit}=categories
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
        <>
          <div
            className="flex justify-between   py-4 items-center cursor-pointer  bg-white w-full"
            onClick={() => {
              toggleArrow();
            }}
          >
            <span
              className={
                `font-bold text-black text-` + (card["@type"] ? "xl" : "base")
              }
            >
              {title} ({itemCards.length})
            </span>
            <i
              className={
                `text-2xl font-bold text-gray-800 fi fi-rs-angle-small-` +
                (isOpen ? "up" : "down")
              }
            ></i>
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} />}
        </>
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

  export default MenuCard