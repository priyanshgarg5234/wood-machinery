const express = require('express')
const app = express();
const path = require('path')
//join with react
const cors = require('cors')
// app.use(express.static(path.join(__dirname,'../machinery/build')))
//configure environment variables
require('dotenv').config()
//add body parsing middleware
app.use(express.json())
app.use(cors())

//import api
const userApp = require('./APIs/user-api');
const productApp = require('./APIs/product-api');
const quotationApp = require('./APIs/quotation-api');

//forward req to userApp when path starts with '/user-api'
app.use('/user-api', userApp)
app.use('/product-api', productApp)
app.use('/quotation-api', quotationApp)

app.use('', (req, res, next) => {
    res.sendFile((path.join(__dirname, '../machinery/build/index.html')))
})

// sync error handler
app.use((err, req, res, next) => {
    res.send({ message: 'error occuurred', payload: err.message })
})

//assign pert number
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})