import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

import footer_logo from '../Assets/logo_wolf.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Alpha Wolf Parts</p>
      </div>
      <ul className="footer_links">
        <li><Link to="/">Parts</Link></li>
        <li><a href="/#about">About</a></li>
        <li><a href="https://wa.me/8329831919" target="_blank" rel="noopener noreferrer">Contacts</a></li>
      </ul>
      <div className="footer_social_icons">
        <div className="footer_icons_container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer_icons_container">
            <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer_icons_container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer_copyright">
        <hr />
        <p>Copyright &copy; {new Date().getFullYear()} Alpha Wolf Parts. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
