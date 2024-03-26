//import mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.ATLAS_DB_URL;

//coonect to DB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connection success");
  })
  .catch((err) => console.log("Error in DB connect", err));

//create User schema
const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: [true]
  },
  firstName: {
    type: String,
    required: [true]
  },
  lastName: {
    type: String,
    required: [true]
  },
  mobile: {
    type: String,
    required: [true]
  },
  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  }
});

//create Seller schema
const sellerSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: [true]
  },
  firstName: {
    type: String,
    required: [true]
  },
  lastName: {
    type: String,
    required: [true]
  },
  mobile: {
    type: String,
    required: [true]
  },
  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  }
});

//create Product schema
const productSchema = new mongoose.Schema({
  seller: {
    username: {
      type: String
    },
    email: {
      type: String
    }
  },
  products: [
    {
      sellerEmail: {
        type: String
      },
      name: {
        type: String,
        required: [true, "Product Name is required"],
      },
      brand: {
        type: String,
        required: [true, "Brand Name is required"],
      },
      category: {
        type: String,
        required: [true, "Category Name is required "],
      },
      discription: {
        type: String,
        required: [true, "Discription is required"],
      },
      specification: {
        type: String,
      },
      price: {
        type: Number,
        required: [true, "price is required"],
      },
      image: {
        type: String
      }
    }
  ]
});

//create quotation schema
const quotationSchema = new mongoose.Schema({
  quotationReq: {
    productInfo: {
      sellerEmail: String,
      name: String,
      brand: String,
      brand: String,
      category: String,
      discription: String,
      specification: String,
      price: Number,
      _id: String,
      image: String
    },
    userInfo: {
      name: String,
      email: String,
      mobile: String,
      companyName: String,
      address: {
        address1: String,
        address2: String,
        city: String,
        state: String,
        country: String
      }
    }
  },
  quotationRes: {
    rate: String,
    insurance: String,
    freightCharges: String,
    basic: String,
    igst: String,
    total: String
  }

});

//create Model(class) for the userSchema
const User = mongoose.model("user", userSchema);

//create Model(class) for the sellerSchema
const Seller = mongoose.model("seller", sellerSchema);

//create Model(class) for the productSchema
const Products = mongoose.model("products", productSchema);

//create Model(class) for the productSchema
const Quotations = mongoose.model("quotations", quotationSchema);

//export User model
module.exports = { User, Seller, Products, Quotations };