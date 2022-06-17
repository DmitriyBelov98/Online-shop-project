const Cart = require("../models/cart.model");
function initializeCart(req, res, next) {
  let cart;
  if (!req.session.cart) {
    // если у пользователя еще нет корзины то инициализируем её
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    // если есть корзина то создать экземпляр уже с существующими элементами
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }
  // сохраняем инициализацию в locals для проверки пользователей
  res.locals.cart = cart;
  next();
}

module.exports = initializeCart;
