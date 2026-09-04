import React from 'react'
import './Breadcrums.css'
import { FiChevronRight } from 'react-icons/fi'

const Breadcrums = (props) => {
  const {product} = props;
  return (
    <div className='breadcrums'>
      HOME <FiChevronRight /> SHOP <FiChevronRight /> {product.category} <FiChevronRight /> {product.name}
    </div>
  )
}

export default Breadcrums
