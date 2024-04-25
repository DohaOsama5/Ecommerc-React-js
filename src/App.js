import TopBar from "./comman/TopBar";
import './css/style.css';
import './css/bootstrap.min.css';
import Headre from "./comman/Headre";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Home, Shop } from "./pages";
import Footer from "./comman/Footer";
import ShopDet from "./pages/ShopPage/ShopDet";
import RegistrationForm from "./pages/HomePages/RegistrationForm";
import WhisList from "./pages/HomePages/WhisList";



function App() {
  return (
    <div>
      <Router>

        <Headre />
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/shop" element={ <Shop/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Shop/>}/>
          <Route path="/shop-details" element={<ShopDet/>}/>
          <Route path="/RegistrationForm" element={<RegistrationForm/>}/>
          <Route path="/WhisList" element={<WhisList/>}/>
          
        </Routes>
        <Footer/>
      </Router>


    </div>
  );
}

export default App;
