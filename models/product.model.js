const mongodb = require("mongodb");
const db = require("../data/database");
class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // имя получаемого изображения
    
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString(); // id бд
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
        error.code = 404;
        throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });
    if (!prodId) {
      const error = new Error("Could not find product with provided id");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }
  // статическая функция получения всех данных с бд в виде массива
  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    // возвращает новый экземпляр в виде объекта с данными вместе с путями и url изображений
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    // объект без некоторых полей который не следует хранить в бд (imagePath, imageUrl)
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    if(this.id) {
      const productId = mongodb.ObjectId(this.id);

      if(!this.image) {
        delete productData.image;
      }
     await db.getDb().collection('products').updateOne({_id: productId}, {
        $set: productData
      });
    } else {

      await db.getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const productId = mongodb.ObjectId(this.id);
   return db.getDb().collection('products').deleteOne({_id: productId })
  }
}

module.exports = Product;




