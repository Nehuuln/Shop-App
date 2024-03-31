const CartItem = require('../models/cartItem');
const Product = require('../models/product');

// Add product into the cart
const addToCart = async (req, res) => {
    try {
        const productId = req.body.productId;
        const { quantity } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const cartItem = await CartItem.create({
            user: userId,
            product: productId,
            quantity: quantity
        });

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get the products from the cart
const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await CartItem.find({ user: userId }).populate('product');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the quantity of a product in the cart
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedCartItem = await CartItem.findByIdAndUpdate(id, { quantity }, { new: true });
        res.json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product from the cart
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        await CartItem.findByIdAndDelete(id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    updateCartItem,
    deleteCartItem
};
