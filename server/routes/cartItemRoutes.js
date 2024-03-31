const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addToCart, getCartItems, updateCartItem, deleteCartItem } = require('../controllers/cartItemController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/cart_items', addToCart); 
router.get('/cart_items', getCartItems); 
router.put('/cart_items/:id', updateCartItem); 
router.delete('/cart_items/:id', deleteCartItem); 

module.exports = router;
