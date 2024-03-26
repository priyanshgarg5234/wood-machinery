require('dotenv').config()
const jwt = require("jsonwebtoken")


function verifyToken(req, res, next) {
    // get the bearer token
    const bearerToken = req.headers.authorization
    // check for bearer token
    if (bearerToken) {
        // fetch token from bearer tokem
        const token = bearerToken.split(" ")[1]
        // verify token
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            next()
        }
        catch {
            res.send({ message: "login expired" })
        }


    }
    else {
        res.send({ message: "unauthorize access" })
    }


}

module.exports = verifyToken;