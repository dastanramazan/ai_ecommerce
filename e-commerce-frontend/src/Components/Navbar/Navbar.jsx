import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiChevronDown } from 'react-icons/fi'
import logo from '../Assets/logo_wolf.png'
import { ShopContext } from '../../Context/ShopContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const Navbar = () => {

  let [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.currentTarget.classList.toggle('open');
  }

  return (
    <div className='nav'>
      <Link to='/' onClick={()=>{setMenu("shop")}} style={{ textDecoration: 'none' }} className="nav-logo">        <img src={logo} alt="logo" />
        <p>Alpha Wolf Parts</p>
      </Link>
      <FiChevronDown onClick={dropdown_toggle} className='nav-dropdown' />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{ textDecoration: 'none' }}>Home</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("brakes")}}><Link to='/brakes' style={{ textDecoration: 'none' }}>Brakes</Link>{menu==="brakes"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("engine")}}><Link to='/engine' style={{ textDecoration: 'none' }}>Engine</Link>{menu==="engine"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("fluids")}}><Link to='/fluids' style={{ textDecoration: 'none' }}>Fluids</Link>{menu==="fluids"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("aichat")}}><Link to='/aichat' style={{ textDecoration: 'none' }}>AI Helper</Link>{menu==="aichat"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <ThemeToggle />
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
        <Link to="/cart" className="nav-cart-link"><FiShoppingCart /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
