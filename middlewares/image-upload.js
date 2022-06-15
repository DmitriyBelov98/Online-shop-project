const multer = require('multer');
const uuid = require('uuid').v4;
// конфигурация объекта multer
const upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images', // путь сохранения
        filename: function(req, file, cb) {
            cb(null, uuid() + '-' + file.originalname); // имя файла с расширением с генерацией случайного id
        }
    })
});

const configuredMulterMiddleware = upload.single('image') // получение каждого файла по имени поля "name = 'image'"

module.exports = configuredMulterMiddleware;