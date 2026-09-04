import React, { useContext } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { ShopContext } from '../../Context/ShopContext'
import './Toast.css'

const Toast = () => {
  const { toast } = useContext(ShopContext);

  if (!toast) return null;

  return (
    <div className="toast" role="status">
      <FiCheckCircle />
      <span>{toast}</span>
    </div>
  )
}

export default Toast
