import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu";
import { Routes,Route } from "react-router-dom";
function App (){
  return(
  <>
    <Head/>
    <Routes>
      <Route path="/" element={<Body/>}/>
      <Route path="/restaurantMenu" element={<RestaurantMenu/>}/>
    </Routes>
  </>
  )
}

export default App