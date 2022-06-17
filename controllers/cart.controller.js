const Product = require('../models/product.model');


function getCart(req, res) {
    res.render('customer/cart/cart.ejs');
}
async function addCartItem(req, res, next) {
    let product;
    try {

         product = await Product.findById(req.body.productId)
    } catch (error) {
        next(error);
        return;
    }

    const cart = res.locals.cart; // получить поле карты товара
    
    res.locals.cart.addItem(product); // поместить продукт в карту товара
    req.session.cart = cart; // обновить данные в сессии

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity
    }) // успешное добавление данных - 201
}
function updateCartItem(req, res) {
    const cart = res.locals.cart;
    const updatedItemData = cart.updateCartItem(req.body.productId, req.body.quantity);
    req.session.cart = cart;

    res.json({
        message: 'Item updated!',
        updateCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice:  updatedItemData.updatedItemPrice
        }
    })
}

module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem: updateCartItem
}