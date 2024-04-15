import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { UserContext } from '../../context/userContext'
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post('/cart_items', { productId, quantity: 1, userId: user.id });
      toast.success('Add to cart successful!')
      navigate('/cart')
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className='product'>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product._id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <button onClick={() => addToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};