const express = require("express");
const adminController = require('../controllers/admin.controller');
const imageUpload = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', adminController.getProducts);
router.get('/products/new', adminController.getNewProduct);
router.post('/products', imageUpload, adminController.createNewProduct);
router.get('/products/:id', adminController.getUpdateProduct);
router.post('/products/:id', imageUpload, adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);



module.exports = router;