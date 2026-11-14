const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

// Keep fixed paths before /:id so Express does not treat them as product IDs.
router.get('/low-stock', controller.lowStockReport);
router.get('/summary', controller.categorySummary);
router.route('/').post(controller.createProduct).get(controller.getProducts);
router.patch('/:id/restock', controller.adjustStock);
router.route('/:id').get(controller.getProductById).put(controller.updateProduct).delete(controller.deleteProduct);

module.exports = router;
