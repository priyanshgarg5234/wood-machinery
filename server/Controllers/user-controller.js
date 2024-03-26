const { User, Seller } = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

//Create new User
const createUser = async (req, res) => {

  if (req.body.userType === 'customer') {

    //check for existing user with same username
    let existingUser = await User.findOne({ username: req.body.username, email: req.body.email });
    //user already existed
    if (existingUser !== null) {
      return res.status(200).send({ message: "User already existed" });
    }
    //if user not existed, then hash password
    const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    //replace plain password with hashed pw
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    res.status(201).send({ message: "User created successfully", payload: newUser });

  } else {
    //check for existing user with same username
    let existingUser = await Seller.findOne({ username: req.body.username });
    //user already existed
    if (existingUser !== null) {
      return res.status(200).send({ message: "Seller already existed" });
    }
    //if user not existed, then hash password
    const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    //replace plain password with hashed pw
    req.body.password = hashedPassword;
    const newSeller = await Seller.create(req.body);

    res.status(201).send({ message: "Seller created successfully", payload: newSeller });
  }

};

// user login
const loginUser = async (req, res) => {
  //get user crdentials object from req
  const userCredentials = req.body;

  let user;
  // check user type
  if (userCredentials.userType === "") {
    return res.status(200).send({ message: "Select valid user type" });
  }
  if (userCredentials.userType === "customer") {
    //check email in User
    user = await User.findOne({ email: userCredentials.email });
  }
  else {
    //check email in Seller
    user = await Seller.findOne({ email: userCredentials.email });
  }
  //if invalid email
  if (user === null) {
    return res.status(200).send({ message: "Invalid email" });
  }
  //if username is found, compare passwords
  const result = await bcryptjs.compare(
    userCredentials.password,
    user.password
  );
  //if pasword not matched
  if (result === false) {
    return res.status(200).send({ message: "Invalid password" });
  }
  //Create jwt token and sign it
  const signedToken = jwt.sign(
    { username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  res
    .status(200)
    .send({ message: "login success", token: signedToken, user: user });
}

module.exports = {
  createUser,
  loginUser
};