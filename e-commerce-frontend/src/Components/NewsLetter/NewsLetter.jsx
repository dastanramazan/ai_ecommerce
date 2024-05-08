import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='news_letter'>
      <h1>Get Exclusive Offers on Email</h1>
      <p>Subscribe and stay updated.</p>
      <div>
        <input type="email" placeholder='Your email' />
        <button>SUBSCRIBE</button>
      </div>
    </div>
  )
}

export default NewsLetter
