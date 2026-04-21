const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require("../middlewares/authMiddleware");




// Apply the protect middleware to all product routes
router.use(protect);


// Create a new product
router.post('/products', productController.createProduct);

// Get all products
router.get('/products', productController.getAllProducts);

// Get a single product by ID
router.get('/products/:id', productController.getSingleProduct);

// Update a product by ID
router.put('/products/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/products/:id', productController.deleteProduct);


module.exports = router;