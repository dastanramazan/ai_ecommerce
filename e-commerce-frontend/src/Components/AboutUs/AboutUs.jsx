import React from 'react'
import './AboutUs.css'
import logo from '../Assets/logo_wolf.png'
import FadeIn from '../FadeIn/FadeIn'

const AboutUs = () => {
  return (
    <FadeIn id="about" className="about_us">
      <img src={logo} alt="Alpha Wolf Parts" className="about_us_logo" />
      <h2>About Alpha Wolf Parts</h2>
      <p>
        We started Alpha Wolf Parts because finding the right brake pad, filter, or fluid
        for your exact vehicle shouldn't take all day. Every part we list - from Brembo
        brake pads to Mobil 1 engine oil - is checked for fitment and quality before it
        goes on the site, so what you see is what fits.
      </p>
      <p>
        Not sure what you need? Our AI Parts Helper can walk you through it in a couple of
        questions, and our team is always a WhatsApp message away.
      </p>
    </FadeIn>
  )
}

export default AboutUs
