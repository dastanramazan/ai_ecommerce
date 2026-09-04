import React from 'react'
import './NewsLetter.css'
import FadeIn from '../FadeIn/FadeIn'

const NewsLetter = () => {
  return (
    <FadeIn className='news_letter'>
      <h1>Get Exclusive Offers on Email</h1>
      <p>Subscribe and stay updated.</p>
      <div>
        <input type="email" placeholder='Your email' />
        <button>SUBSCRIBE</button>
      </div>
    </FadeIn>
  )
}

export default NewsLetter
