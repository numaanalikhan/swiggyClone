import { useState } from "react";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import { Routes,Route } from "react-router-dom";
import { Coordinates, Visibility } from "./contextApi/context";
function App (){
  var [visible,setVisible] = useState(false)
  var [coord,setCoord] = useState({lat:"17.406498",lng:"78.47724389999999"})
  var [titleName,setTitleName] = useState("Hyderabad")
  return(
    <Coordinates.Provider value={{setCoord,coord,titleName,setTitleName}}>
    <Visibility.Provider value={{visible,setVisible}}>
    <div className={(visible ? "overflow-hidden max-h-screen" :" ")}>
     <Head/>
      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
      </Routes>
    </div>
  </Visibility.Provider>
  </Coordinates.Provider>
  )
}

export default App