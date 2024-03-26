const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('cloudinary-multer')



cloudinary.config({
    cloud_name: "dl4ouuoqi",
    api_key: "564393955828662",
    api_secret: "VygkpQb6a21peOZPZEukKsxIlWc"
})

const storage = cloudinaryStorage({
    cloudinary: cloudinary
})

const upload = multer({ storage: storage })
module.exports = { upload, cloudinary }