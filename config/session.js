const expressSession = require('express-session')
const mongodbStore = require('connect-mongodb-session');
// создание хранилища для сессии
function createSessionStore() {

const MongoDBStore = mongodbStore(expressSession);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'online-shop',
    collection: 'sessions'
});
    return store;
}
// конфигурация сессии
function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false, // сохраняет данные сесси в бд если данные изменялись
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 дня
        }
    };
}

module.exports = createSessionConfig;