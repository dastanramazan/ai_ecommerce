import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth-token'));

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <BrowserRouter>
      <div>
        <Navbar onLogout={logout} />
        <Admin />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
