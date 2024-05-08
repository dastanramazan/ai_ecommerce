import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="products" /></Link>
      <p>{props.name}</p>
      <div className="item_prices">
        <div className="item_price_new">${props.new_price}</div>
        <div className="item_price_old">${props.old_price}</div>
      </div>
    </div>
  )
}

export default Item
