import React from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { ProductCardSkeleton } from '../Skeleton/Skeleton'
import FadeIn from '../FadeIn/FadeIn'

const Popular = (props) => {
  return (
    <FadeIn className='popular'>
    <h1>POPULAR PARTS</h1>
      <hr />
      <div className="popular_item">
        {props.loading
          ? <ProductCardSkeleton count={4} />
          : props.data.map((item,i)=>{
              return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })
        }
      </div>
    </FadeIn>
  )
}

export default Popular
