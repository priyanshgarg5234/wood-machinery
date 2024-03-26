//create a Route(mini exp app)
const exp = require("express");
const userApp = exp.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

//import req handlers from Controller
const {
  createUser,
  loginUser
} = require("../Controllers/user-controller");


//create user
userApp.post("/user", expressAsyncHandler(createUser));

// user login
userApp.post("/login-user", expressAsyncHandler(loginUser));


//export userApp
module.exports = userApp;