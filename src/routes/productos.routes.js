const express = require('express');
const { createNewProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productos.controller');
const router = express.Router();

router.post('/', createNewProduct);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
