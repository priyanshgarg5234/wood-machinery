const express = require('express');
const quotationApp = express.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

const {
  createQuotationRequest,
  getQuotationRequests,
  addQuotationResponse,
  getAllQuoatations
} = require("../Controllers/quotation-controller");
const verifyToken = require('../middlewares/verifyToken');

// add quotation request for product to a seller in db
quotationApp.post("/requestQuotation", verifyToken, expressAsyncHandler(createQuotationRequest))

// get all quotation request of a seller from db
quotationApp.get("/fetchQuotationRequests/:email", expressAsyncHandler(getQuotationRequests))

// add quotation for customer by seller in db
quotationApp.put("/setQuotationRes/:quotationId", expressAsyncHandler(addQuotationResponse))

// all quotation by customer
quotationApp.get("/quotations/:email", expressAsyncHandler(getAllQuoatations))


module.exports = quotationApp;