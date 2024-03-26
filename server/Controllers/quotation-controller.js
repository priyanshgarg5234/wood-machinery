const { Quotations } = require("../db");


const createQuotationRequest = async (req, res) => {
    let quotationReqByUser = req.body
    let result = await Quotations.create({ quotationReq: quotationReqByUser })
    res.send("request successfull")
}
const getQuotationRequests = async (req, res) => {
    let email = req.params.email;
    let quotationRequestsFromDb = await Quotations.find({ 'quotationReq.productInfo.sellerEmail': email });
    res.send({ message: "request successfull", payload: quotationRequestsFromDb })
}

const addQuotationResponse = async (req, res) => {
    let quotationId = req.params.quotationId;
    let quotationResFromSeller = req.body
    let result = await Quotations.findOneAndUpdate({ _id: quotationId }, { quotationRes: quotationResFromSeller }, { new: true })
    res.send("Quotation is send successfuly")
}

const getAllQuoatations = async (req, res) => {
    let email = req.params.email;
    let quotationsFromDb = await Quotations.find({ 'quotationReq.userInfo.email': email });
    // res.send({message:"request successfull",payload:quotationsFromDb})
    res.send(quotationsFromDb)
}



module.exports = {
    createQuotationRequest,
    getQuotationRequests,
    addQuotationResponse,
    getAllQuoatations
}