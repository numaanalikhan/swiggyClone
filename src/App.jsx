import { useEffect, useState } from "react";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import { Routes, Route } from "react-router-dom";
import { CartContext, Coordinates, RestInfo } from "./contextApi/context";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
function App() {
  var visible = useSelector((state) => state.toogleSlice.searchBarToogle);

  var [coord, setCoord] = useState({
    lat: "17.406498",
    lng: "78.47724389999999",
  });
  var [titleName, setTitleName] = useState("Hyderabad");
  var [cartData, setCartData] = useState([]);

  const getDataFromLocalStorage = () => {
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartData(data);
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  var [restInfo, setRestInfo] = useState([]);

  return (
    <Coordinates.Provider value={{ setCoord, coord, titleName, setTitleName }}>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <RestInfo.Provider value={{ restInfo, setRestInfo }}>
          <div className={visible ? "overflow-hidden max-h-screen" : " "}>
            <Head />
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
              <Route path="/checkout" element={<Cart />} />
              <Route
                path="*"
                element={<h1 className="mt-[80px]">coming soonn....</h1>}
              />
            </Routes>
          </div>
        </RestInfo.Provider>
      </CartContext.Provider>
    </Coordinates.Provider>
  );
}

export default App;
