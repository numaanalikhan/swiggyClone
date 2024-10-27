import axios from "axios";
import OnYourMind from "./OnYourMind";
import TopResturants from "./TopResturants";

function Body() {
 
  return (
    <div className="w-full mt-1">

      <div className="w-[74%] mx-auto overflow-hidden ">
        <OnYourMind/>
        <TopResturants/>
      </div>
    </div>
  );
}

export default Body;
