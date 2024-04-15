import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext'
import { toast } from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const {user} = useContext(UserContext); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart_items', { params: { userId: user.id } });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/cart_items/${itemId}`);
      setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      toast.success('Product removed!')
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`/cart_items/${itemId}`, { quantity: newQuantity });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className='cart'>
      <h2 id="cart-title">Cart</h2>
      {cartItems.length === 0 ? (
        <p id="empty-cart-msg">Empty Cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={item._id} id={`cart-item-${index}`} className="cart-item">
            <h3 className="item-name">{item.product.name}</h3>
            <img src={item.product.image} alt={item.product.name} className="item-image" />
            <p className="item-price">Price: {item.product.price}</p>
            <p className="item-quantity">Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              className="quantity-input"
            />
          </div>
        ))
      )}
    </div>
  );
};
