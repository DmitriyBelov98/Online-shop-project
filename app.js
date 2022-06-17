const path = require("path");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const db = require('./data/database');
const csrf = require('csurf');
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const cartMiddleware = require('./middlewares/cart');
const adminRoutes = require('./routes/admin.routes');
const errorHandleMiddleware = require('./middlewares/error-handler');
const protectRoutes = require('./middlewares/protect-routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/orders.routes');


const app = express();
// подключение ejs шаблона
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public")); // доступ к статичным файлам браузеру
app.use('/products/assets', express.static('product-data')); // доступ к картинкам как к статичным файлам

app.use(express.urlencoded({extended: false})); // обработка вводимых данных
app.use(express.json());

// подключение сессии
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));


// csrf токен
app.use(csrf());

app.use(cartMiddleware); 
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes); // подключение базовых роутов
app.use(authRoutes); // подключение всех роутов аутентификации
app.use(productRoutes); // подключение роутов с товаром
app.use('/cart', cartRoutes)
app.use(protectRoutes); // активация функции по защите данных администратора
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes); // подключение роутов админа с фильтрованым путём



app.use(errorHandleMiddleware); // обработка ошибок в случае неисправностей

// подключение базы данных с обработкой ошибки
db.connectToDatabase().then(function() {
    app.listen(3000);

}).catch(function(error) {
    console.log('Failed to connet to the database!');
    console.log(error)
});
