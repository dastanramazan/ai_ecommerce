import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/logo_wolf.png'
// import navprofileIcon from '../Assets/nav-profile.svg'
import navprofileIcon from '../Assets/avatar-1.svg'

const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="" />
      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={onLogout}>Logout</button>
        <img src={navprofileIcon} className='nav-profile' alt="" />
      </div>
    </div>
  )
}

export default Navbar
