
const Product = require('../models/product.model');

async function getAllProducts(req, res) {

    try {
        const products = await Product.findAll()
        res.render('customer/products/all-products', {products: products});
    } catch (error) {
        return next(error);
    }
}

async function viewProductDetails(req, res, next) {
    try {

        const product = await Product.findById(req.params.id);
        res.render('customer/products/product-detail', {product: product});
    } catch (error) {
        return next(error);
    }
}
module.exports = {
    getAllProducts: getAllProducts,
    viewProductDetails: viewProductDetails
}