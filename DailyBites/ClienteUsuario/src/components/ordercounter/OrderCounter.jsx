// src/components/OrderCounter.jsx
import React, { useState } from 'react';

const OrderCounter = ({ quantity, setQuantity }) => {
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div>
      <button onClick={handleDecrease}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default OrderCounter;
