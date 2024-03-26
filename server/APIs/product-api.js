// create mini react app
const express = require('express');
const productApp = express.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

const {
  addNewProduct,
  getAllProductsBySeller,
  getAllProducts,
  deleteProduct
} = require("../Controllers/product-controller");
const { upload } = require("../middlewares/cloudinaryUpload");
const verifyToken = require('../middlewares/verifyToken');

//add product
productApp.post("/product", upload.single('image'), expressAsyncHandler(addNewProduct));


// get products by seller
productApp.get('/products/:email', expressAsyncHandler(getAllProductsBySeller))
// get products 
productApp.get('/products', expressAsyncHandler(getAllProducts))
// delete product
productApp.delete('/product/:productId/:sellerEmail', expressAsyncHandler(deleteProduct))


module.exports = productApp;