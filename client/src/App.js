import "./App.css";
import Buynow from "./components/buynow/Buynow";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import Maincomponent from "./components/home/Maincomponent";
import Newnav from "./components/newnavbaar/Newnav";
import Sign_in from "./components/signup_sign/Sign_in";
import Sign_up from "./components/signup_sign/Sign_up";
import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={<Maincomponent />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<Sign_up />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
