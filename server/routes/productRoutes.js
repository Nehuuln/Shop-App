const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/productController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);

module.exports = router;
