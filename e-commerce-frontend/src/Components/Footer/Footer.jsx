import React from 'react'
import './Footer.css'

import footer_logo from '../Assets/logo_wolf.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>CAR PARTS</p>
      </div>
      <ul className="footer_links">
        <li>Company</li>
        <li>Parts</li>
        <li>About</li>
        <li>Contacts</li>
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
        <p>Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
