import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    cakeType: '',
    deliveryDate: '',
    additionalItems: [],
    comments: ''
  });

  const additionalItemsList = [
    { id: 'pinata', name: 'Piñata', price: 29.99 },
    { id: 'sugarprint', name: 'Sugar Print', price: 19.99 },
    { id: 'candles', name: 'Special Candles', price: 9.99 },
    { id: 'topper', name: 'Cake Topper', price: 14.99 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdditionalItemChange = (e) => {
    const { value, checked } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      additionalItems: checked 
        ? [...prev.additionalItems, value]
        : prev.additionalItems.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!localStorage.getItem('auth-token')) {
      alert('Please login to place an order');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(orderDetails)
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Order submitted successfully!');
        setOrderDetails({
          cakeType: '',
          deliveryDate: '',
          additionalItems: [],
          comments: ''
        });
      } else {
        alert('Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="order-form-container">
      <h2>Create Your Custom Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>Select Your Cake</label>
          <select 
            name="cakeType" 
            value={orderDetails.cakeType}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose a cake type</option>
            <option value="birthday">Birthday Cake</option>
            <option value="wedding">Wedding Cake</option>
            <option value="custom">Custom Cake</option>
            <option value="children">Children's Cake</option>
          </select>
        </div>

        <div className="form-group">
          <label>Delivery Date</label>
          <input 
            type="date"
            name="deliveryDate"
            value={orderDetails.deliveryDate}
            onChange={handleInputChange}
            min={minDate}
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Items</label>
          <div className="additional-items">
            {additionalItemsList.map(item => (
              <div key={item.id} className="item-checkbox">
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  checked={orderDetails.additionalItems.includes(item.id)}
                  onChange={handleAdditionalItemChange}
                />
                <label htmlFor={item.id}>{item.name} (${item.price})</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Special Instructions or Comments</label>
          <textarea
            name="comments"
            value={orderDetails.comments}
            onChange={handleInputChange}
            placeholder="Enter any special requests or comments here..."
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
