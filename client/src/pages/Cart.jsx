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
    <div>
    <h2>Cart</h2>
    {cartItems.length === 0 ? (
      <p>Empty Cart</p>
    ) : (
      cartItems.map((item) => (
        <div key={item._id}>
          <h3>{item.product.name}</h3>
          <p>Price: {item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
          />
        </div>
      ))
    )}
  </div>
  );
};
