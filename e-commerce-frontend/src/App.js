import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import banner_1 from "./Components/Assets/banners/banner_1.webp";
import banner_2 from "./Components/Assets/banners/Car-parts.jpg";
import banner_3 from "./Components/Assets/banners/Various-Car-Parts.jpeg";
import LoginSignup from "./Pages/LoginSignup";
import Aichat from "./Components/AiChat/Aichat";

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/cakes" element={<ShopCategory banner={banner_1} category="cakes" />} />
          <Route path="/pinata" element={<ShopCategory banner={banner_2} category="pinata" />} />
          <Route path="/sugarprints" element={<ShopCategory banner={banner_3} category="sugarprints" />} />
          <Route path="/aichat" element={<Aichat/>} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
