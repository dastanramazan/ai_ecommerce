import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>We couldn't find the part of the site you're looking for.</p>
      <Link to="/" className="not-found-link">Back to the shop &gt;</Link>
    </div>
  )
}

export default NotFound
