import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Product() {
  const [products, setProducts] = useState([]);

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
      await axios.post('/cart_items', { productId, quantity: 1 });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <button onClick={() => addToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};