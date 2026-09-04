import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import banner_1 from "./Components/Assets/banners/brake-rotor.jpg";
import banner_2 from "./Components/Assets/banners/engine-bay.jpg";
import banner_3 from "./Components/Assets/banners/oil-change.jpg";
import LoginSignup from "./Pages/LoginSignup";
import Aichat from "./Components/AiChat/Aichat";
import NotFound from "./Pages/NotFound";
import Toast from "./Components/Toast/Toast";
import PageTransition from "./Components/PageTransition/PageTransition";

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <PageTransition renderRoutes={(loc) => (
          <Routes location={loc}>
            <Route path="/" element={<Shop gender="all" />} />
            <Route path="/brakes" element={<ShopCategory banner={banner_1} category="brakes" bannerAlt="Close-up of a car brake disc and caliper" />} />
            <Route path="/engine" element={<ShopCategory banner={banner_2} category="engine" bannerAlt="Close-up of a car engine bay" />} />
            <Route path="/fluids" element={<ShopCategory banner={banner_3} category="fluids" bannerAlt="Mechanic pouring engine oil into a car" />} />
            <Route path="/aichat" element={<Aichat/>} />
            <Route path='/product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        )} />
        <Footer />
        <Toast />
      </Router>
    </div>
  );
}

export default App;
