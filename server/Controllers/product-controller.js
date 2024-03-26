const { Products } = require("../db");
const { cloudinary } = require("../middlewares/cloudinaryUpload")

// add new product

const addNewProduct = async (req, res) => {
    const data = JSON.parse(req.body.data)
    const resultUrl = req.file.url
    data.newProduct.image = resultUrl;
    const existingSeller = await Products.findOne({ "seller.username": data.currentUser.username })
    if (existingSeller === null) {
        await Products.create({ seller: { username: data.currentUser.username, email: data.currentUser.email }, products: [data.newProduct] });
        return res.status(200).send({ message: 'New product added successfully' });
    }
    else {
        await Products.updateOne({ 'seller.username': data.currentUser.username }, { $push: { products: data.newProduct } });
        return res.status(200).send({ message: 'New product added to existing seller' });
    }
}

// get products of a seller
const getAllProductsBySeller = async (req, res) => {
    const currEmail = req.params.email;
    let productsObjFromDb = await Products.findOne({ "seller.email": currEmail });
    if (productsObjFromDb === null) {
        return res.send("no product is available")
    }
    res.status(200).send(productsObjFromDb.products)

}

//get all products
const getAllProducts = async (req, res) => {
    const productsObjArr = await Products.find();
    if (productsObjArr === null) {
        return res.send("no product is available")
    }
    res.send({ message: "res send", payload: productsObjArr })
};

// delete product by product id
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    const sellerEmail = req.params.sellerEmail;
    const result = await Products.updateOne(
        { "seller.email": sellerEmail },
        { $pull: { products: { _id: productId } } }
    );
    if (result.nModified === 0) {
        return res.status(404).send({ error: "Product not found" });
    }

    return res.status(200).send({ message: "Product deleted successfully" });

}

module.exports = {
    addNewProduct,
    getAllProductsBySeller,
    getAllProducts,
    deleteProduct
}